<template>
  <div class="container">
    <div class="subcontainer subcontainer--left">
      <div class="subcontainer__block">
        <span class="block">マイル</span>
        <span class="block">Miles Croxford</span>
      </div>

      <div class="subcontainer__block">
        <p> I'm Miles Croxford a Senior full stack developer, 25 year old with over 6 years experience developing web
          applications.
          Worked with startups and agencies in London, now living in Brighton working with <a
              href="https://www.hare.digital/">Hare</a> tackling big data problems, working
          on single page applications and restful APIs.</p>
      </div>

      <div class="subcontainer__block">
        <span class="block block--header">Recently</span>
        <p> Made: <a target="_blank" href="https://avtr.io">avtr.io; Api for generating user avatars</a>
        </p>

        <p> Github Commits:
          <span v-if="github.loading" v-text="github.loadingStr"></span>
          <a href="https://github.com/m1" target="_blank" v-else v-text="github.data"></a>
        </p>

        <p> Listened to:
          <span v-if="lastfm.loading" v-text="lastfm.loadingStr">
          </span> <a href="http://last.fm/user/miles_c" target="_blank" v-else v-text="lastfm.data"></a>
        </p>

        <p> Tweeted:
          <span v-if="twitter.loading" v-text="twitter.loadingStr"></span>
          <a href="https://twitter.com/milescroxford" target="_BLANK" v-else v-html="twitter.data"></a>
        </p>
      </div>

      <div class="subcontainer__block">
        <a href="mailto:hello@milescroxford.com">hello@milescroxford.com</a>
      </div>
    </div>

    <div class="subcontainer subcontainer--right">
      <div class="subcontainer__block">
        <span class="block">Presence</span>
      </div>

      <div class="subcontainer__block">
        <ul>
          <li><span class="num">00</span><a href="https://github.com/m1">Github</a></li>
          <li><span class="num">01</span><a href="https://twitter.com/milescroxford">Twitter</a></li>
          <li><span class="num">02</span><a href="http://last.fm/user/miles_c">LastFM</a></li>
          <li><span class="num">03</span><a href="https://www.linkedin.com/in/milescroxford/">LinkedIn</a></li>
          <li><span class="num">04</span><a href="https://www.instagram.com/milescroxford/">Instagram</a></li>
        </ul>
      </div>

      <div class="subcontainer__block">
        <span class="block block--header">Specialities</span>
        <ul>
          <li><span class="num">00</span>PHP [Laravel, Symfony, APIs]</li>
          <li><span class="num">01</span>Javascript [React, Vue, ES6]</li>
          <li><span class="num">02</span>Systems architecture</li>
        </ul>
      </div>

    </div>
  </div>
</template>

<script>
  import axios from 'axios';

  export default {
    data() {
      return {
        github:         {
          loading:    true,
          loadingStr: '-',
          interval:   false,
          data:       false,
        },
        lastfm:         {
          loading:    true,
          loadingStr: '-',
          interval:   false,
          data:       false,
        },
        twitter:        {
          loading:    true,
          loadingStr: '-',
          interval:   false,
          data:       false,
        },
        loadingSymbols: ['-', '\\', '|', '/', '-'],
      };
    },
    mounted() {
      this.loading('github');
      this.loading('lastfm');
      this.loading('twitter');

      this.getData();
    },
    methods: {
      loading(type) {
        this[type].interval = setInterval(() => {
          if (!this[type].loading) {
            clearInterval(this[type].interval);
          }

          const idx  = this.loadingSymbols.indexOf(this[type].loadingStr);
          const newIdx = (idx === (this.loadingSymbols.length - 1)) ? 0 : idx + 1;

          this[type].loadingStr = this.loadingSymbols[newIdx];
        }, 250);
      },
      getData() {
        axios.get('/data.json')
             .then((response) => {
               this.github.data    = response.data.github;
               this.github.loading = false;

               this.lastfm.data    = response.data.lastfm;
               this.lastfm.loading = false;

               this.twitter.data    = response.data.twitter;
               this.twitter.loading = false;
             })
             .catch(() => {
               this.github.data    = '-';
               this.github.loading = false;

               this.lastfm.data    = '-';
               this.lastfm.loading = false;

               this.twitter.data    = '-';
               this.twitter.loading = false;
             });
      },
    },
  };
</script>
