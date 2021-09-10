<template>
  <div>
    <!--Nav-->
    <header class="bg-gray-800 p-2 mt-0 w-full">
      <div class="container mx-auto flex flex-wrap items-center">
        <div
          class="
            flex
            w-full
            justify-center
            md:justify-start
            text-white
            font-extrabold
          "
        >
          <span class="text-2xl pl-2 py-2 font-display font-medium">
            <i class="em em-grinning"></i> 可愛い文鳥の動画を見て癒されたい！
          </span>
        </div>
      </div>
    </header>

    <!--Container-->
    <main class="container mx-auto bg-white mt-8 font-body">
      <div class="flex flex-wrap">
        <div
          class="w-1/2 lg:w-1/3 xl:w-1/4 px-4 my-4"
          v-for="tweet in tweets"
          :key="tweet.id"
        >
          <figure class="cursor-pointer" @click="activeTweet = tweet">
            <img
              :src="tweet.entities.media[0].media_url_https"
              class="
                rounded
                object-cover
                w-full
                h-48
                md:h-72
                shadow-md
                hover:opacity-60
              "
            />
          </figure>
        </div>
      </div>

      <!--Modal-->
      <div
        v-show="activeTweet !== undefined"
        class="
          modal
          fixed
          w-full
          h-full
          top-0
          left-0
          flex
          items-center
          justify-center
        "
      >
        <div
          class="modal-overlay absolute w-full h-full bg-gray-900 opacity-50"
          @click="activeTweet = undefined"
        ></div>

        <div
          class="
            modal-container
            bg-white
            w-auto
            mx-auto
            rounded
            shadow-lg
            z-50
            overflow-y-auto
          "
        >
          <div
            class="
              modal-close
              absolute
              top-0
              right-0
              cursor-pointer
              flex flex-col
              items-center
              mt-4
              mr-4
              text-white text-sm
              z-50
            "
            @click="activeTweet = undefined"
          >
            <svg
              class="fill-current text-white"
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 18 18"
            >
              <path
                d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"
              ></path>
            </svg>
            <span class="text-sm">(Esc)</span>
          </div>

          <!-- Add margin if you want to see some of the overlay behind the modal-->
          <div
            class="
              modal-content
              py-4
              text-left
              px-6
              max-h-85vh
              flex flex-col
              items-center
            "
          >
            <!--Body-->
            <video
              :src="activeTweetVideoUrl"
              controls
              class="max-h-70vh min-h-60vh"
              @keypress.esc.capture="tweet = undefined"
            ></video>

            <!--Footer-->
            <footer class="max-w-50%">
              <div
                class="flex justify-end pt-2"
                v-if="activeTweet !== undefined"
              >
                <p>{{ activeTweet.text }}</p>
              </div>
              <div
                class="flex justify-end pt-2"
                v-if="activeTweet !== undefined"
              >
                <p>
                  <a
                    :href="
                      'https://twitter.com/' +
                      activeTweet.user.screen_name +
                      '/status/' +
                      activeTweet.id_str
                    "
                    target="_blank"
                    rel="noopener noreferrer"
                    class="text-blue-500 hover:underline"
                  >
                    @{{ activeTweet.user.screen_name }}
                  </a>
                </p>
              </div>
            </footer>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { TwitterClient } from 'twitter-api-client'
import { Status } from 'twitter-api-client/dist/interfaces/types/SearchTypes'

export default Vue.extend({
  data() {
    return {
      activeTweet: undefined as Status | undefined,
    }
  },

  async asyncData({ $config }) {
    const twitterClient = new TwitterClient({
      apiKey: $config.twitterApiKey,
      apiSecret: $config.twitterApiSecret,
      accessToken: $config.twitterAccessToken,
      accessTokenSecret: $config.twitterAccessTokenSecret,
    })
    const data = await twitterClient.tweets.search({
      q: '文鳥 min_faves:100 filter:native_video',
    })

    return { tweets: data.statuses.filter((t) => 'media' in t.entities) }
  },

  computed: {
    activeTweetVideoUrl(): string {
      if (this.activeTweet === undefined) return ''

      const url = this.activeTweet.extended_entities.media.find(
        (m) => m.type === 'video'
      )?.video_info?.variants[0].url

      return url ?? ''
    },
  },
})
</script>
