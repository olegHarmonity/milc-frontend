<template>
  <div class="single-category">
    <!-- <div
      v-if="!$store.getters['products/myProducts'].length && !loaded"
      class="d-flex w-100 h-100"
      style="position: absolute"
    >
      <MilcLoader class="mx-auto my-auto" />
    </div> -->
    <div class="single-category-navigation">
      <div
        class="nav-icon-wrapper pointer"
        @click="activeFilterSidebar = !activeFilterSidebar"
      >
        <div class="nav-icon">
          <span></span>
          <span></span>
        </div>
      </div>
      <div
        class="navigations"
        :class="{ 'justify-center': !needScroll }"
        ref="navigation"
      >
        <span
          class="pointer"
          :class="{ active: filters.searchGenre == 'all' }"
          @click="setActiveGenre('all')"
        >
          All
        </span>
        <span
          v-for="genre in $store.getters['movieGenres/items']"
          class="pointer decorative-font"
          :class="{ active: genre.id == filters.searchGenre }"
          :key="genre.id"
          @click="setActiveGenre(genre.id)"
        >
          {{ genre.name }}
        </span>
      </div>
    </div>

    <div class="single-category-body">
      <div class="single-category-content" id="single-category-content">
        <div
          v-if="$store.getters['products/myProducts'].length && loaded"
          :style="{ 'grid-template-columns': `repeat(${itemWidth}, 200px)` }"
        >
          <ProductsSingleCatetgoryItem
            v-for="(item, key) in getProducts"
            :key="`item-${filters.searchGenre}-${key}`"
            :product="item"
          />
        </div>
        <div class="text-center mt-4" v-if="totalPages > 1">
          <v-pagination v-model="page" :length="totalPages"></v-pagination>
        </div>
      </div>
      <div
        v-if="
          !$store.getters['products/myProducts'].length &&
          !$store.getters['products/loading'].fetchMyProducts
        "
        class="text-center"
      >
        <h3>Sorry, nothing found.</h3>
        <div>Try selecting another category or clear filters.</div>
      </div>
    </div>
    <div
      class="single-category-sidebar"
      :class="{ active: activeFilterSidebar }"
    >
      <div class="single-category-sidebar-icon">
        <v-icon large class="mr-1" @click="activeFilterSidebar = false"
          >mdi-close</v-icon
        >
      </div>
      <div class="single-category-sidebar-seller-platform">
        <div class="seller-platform" @click="$router.push($platformRoute)">
          Platform
        </div>
      </div>
      <div class="single-category-sidebar-search mt-2">
        <div class="search-holder">
          <v-text-field
            v-model="filters.search"
            v-debounce="fetchProducts"
            :placeholder="$t('labels.search')"
            style="max-width: 300px"
            append-icon="mdi-magnify"
            height="44"
            solo
            dense
            hide-details
          >
            <template v-slot:append>
              <div class="search-icon">
                <v-icon style="color: #c6c6c6"> mdi-magnify </v-icon>
              </div>
            </template>
          </v-text-field>
        </div>
      </div>
      <div class="single-category-sidebar-newest filter-content mt-7">
        <h3 class="pointer" @click="resetFilters">Newest</h3>
      </div>
      <div class="single-category-sidebar-topRated filter-content mb-5">
        <h3>Top rated</h3>
      </div>
      <template>
        <div class="single-category-sidebar-years filter-content">
          <h3>Years</h3>
          <div class="custom-autocomplete-wrapper">
            <div
              class="custom-autocomplete"
              :class="{ active: yearsDropdownActive }"
            >
              <div class="selection-and-input">
                <div class="custom-autocomplete-selections">
                  {{ parseSelectedYears }}
                </div>
                <div class="input-wrapper">
                  <input type="text" v-model="searchYears" />
                  <v-btn
                    v-if="filters.selectedYears.length"
                    icon
                    @click.stop="clearSelectedYears"
                  >
                    <v-icon>mdi-close</v-icon>
                  </v-btn>
                </div>
              </div>
              <div class="custom-icons">
                <v-btn
                  icon
                  @click.stop="yearsDropdownActive = !yearsDropdownActive"
                >
                  <v-icon>{{
                    yearsDropdownActive ? "mdi-menu-up" : "mdi-menu-down"
                  }}</v-icon>
                </v-btn>
              </div>
            </div>
          </div>
          <div
            v-if="yearsDropdownActive"
            class="checkbox-containers autocomplete"
          >
            <div
              class="checkbox-container"
              v-for="(year, key) in filterYears"
              :key="`year-${key}`"
            >
              <div
                class="checkbox pointer"
                :class="{ active: isSelected(year) }"
                @click="toggleYear(year)"
              >
                <v-icon v-if="isSelected(year)" small class="mr-1" color="#fff">
                  mdi-check
                </v-icon>
              </div>
              <span>{{ year }}</span>
            </div>
          </div>
        </div>
      </template>
      <div class="single-category-sidebar-status filter-content mt-4">
        <h3>Status</h3>
        <div class="checkbox-containers">
          <div
            class="checkbox-container"
            v-for="(item, key) in filters.status"
            :key="`status-${key}`"
          >
            <div
              class="checkbox pointer"
              :class="{ active: item.active }"
              @click="
                item.active = !item.active;
                fetchProducts();
              "
            >
              <v-icon v-if="item.active" small class="mr-1" color="#fff">
                mdi-check
              </v-icon>
            </div>
            <span>{{ item.name }}</span>
          </div>
        </div>
      </div>
      <div class="single-category-sidebar-content-type filter-content mt-4">
        <h3>Content type</h3>
        <div class="checkbox-containers">
          <div
            class="checkbox-container"
            v-for="(item, key) in filters.contentType"
            :key="`contentType-${key}`"
          >
            <div
              class="checkbox pointer"
              :class="{ active: item.active }"
              @click="
                item.active = !item.active;
                fetchProducts();
              "
            >
              <v-icon v-if="item.active" small class="mr-1" color="#fff">
                mdi-check
              </v-icon>
            </div>
            <span>{{ item.name }}</span>
          </div>
        </div>
      </div>
      <div class="single-category-sidebar-reset mt-4">
        <div class="reset pointer" @click="resetFilters">Reset all</div>
      </div>
    </div>
    <div
      class="spinner-wrapper"
      v-if="$store.getters['products/loading'].fetchMyProducts"
    >
      <spinner large />
    </div>
  </div>
</template>

<script>
import { forEach, filter, ceil } from "lodash";
import ProductsSingleCatetgoryItem from "@/components/app/products/ProductsSingleCatetgoryItem";
//import MilcLoader from "@/components/common/MilcLoader.vue";

export default {
  name: "ProductsSingleCategory",
  data() {
    return {
      itemWidth: 0,
      products: null,
      genres: null,
      filters: {
        searchGenre: null,
        search: "",
        newest: false,
        topRated: false,
        years: [],
        newYears: [],
        status: [
          {
            active: false,
            name: "Released",
            value: "released",
          },
          {
            active: false,
            name: "Unreleased",
            value: "unreleased",
          },
        ],
        contentType: [],
        selectedYears: [],
      },
      // years: [],
      // status: [],
      // contentType: [],
      activeFilterSidebar: false,
      needScroll: false,
      searchYears: [],
      yearsDropdownActive: false,
      loaded: false,
      page: 1,
      perPage: 33,
    };
  },
  components: { ProductsSingleCatetgoryItem },
  created() {
    this.$store.dispatch("movieContentTypes/fetchAll").then((data) => {
      this.filters.contentType = data.map((i) => ({
        ...i,
        active: false,
      }));
    });
  },
  async mounted() {
    this.filters.searchGenre = this.$route.params.id;
    if (!this.$store.getters["movieGenres/items"].length) {
      this.genres = (
        await this.$store.dispatch("movieGenres/fetchAll", true)
      ).data.data;
    } else {
      this.genres = this.$store.getters["movieGenres/items"];
    }

    this.products = await this.$store.dispatch(
      "products/fetchProductsBySearch",
      { genre_id: "all" }
    );

    this.createYears();
    this.getItemWidth();
    window.addEventListener("resize", this.getItemWidth);
    this.$nextTick(() => {
      this.loaded = true;
    });
  },
  computed: {
    filterYears() {
      return this.searchYears
        ? filter(this.filters.years, (year) => year.includes(this.searchYears))
        : this.filters.years;
    },
    parseSelectedYears() {
      return this.filters.selectedYears.toString().replace(/,/g, ", ");
    },
    getProducts() {
      const start = (this.page - 1) * this.perPage;
      const end = this.page * this.perPage;
      return this.$store.getters["products/myProducts"]
        ? this.$store.getters["products/myProducts"].slice(start, end)
        : [];
    },
    totalPages() {
      return ceil(
        this.$store.getters["products/myProducts"].length / this.perPage
      );
    },
  },
  methods: {
    navigationNeedScroll() {
      const { offsetWidth, scrollWidth } = this.$refs.navigation;
      this.needScroll = scrollWidth > offsetWidth;
    },
    getItemWidth() {
      const parentWidth = document.getElementById(
        "single-category-content"
      ).offsetWidth;

      const itemsLength = parseInt((parentWidth / 200).toString(), 10);
      this.itemWidth =
        itemsLength > this.$store.getters["products/myProducts"].length
          ? this.$store.getters["products/myProducts"].length
          : itemsLength;
      this.navigationNeedScroll();
    },
    createQueryParams() {
      let queryParams = {};
      forEach(this.filters, (value, key) => {
        switch (key) {
          case "searchGenre":
            queryParams.genre_id = value;
            break;
          case "newest":
            if (value) {
              queryParams["newest"] = value;
            }
            break;
          case "topRated":
            if (value) {
              queryParams["topRated"] = value;
            }
            break;
          case "search":
            if (value) {
              queryParams["search[title]"] = value;
            }
            break;
          case "years": {
            let counter = 0;
            this.filters.selectedYears.forEach((year) => {
              queryParams[
                `exact_search[production_info.release_year][${counter++}]`
              ] = year;
            });
            break;
          }
          case "status": {
            let counter = 0;
            this.filters.status.forEach((i) => {
              if (i.active) {
                queryParams[
                  `exact_search[production_info.production_status][${counter++}]`
                ] = i.value;
              }
            });
            break;
          }
          case "contentType": {
            let counter = 0;
            this.filters.contentType.forEach((i) => {
              if (i.active) {
                queryParams[`exact_search[content_type_id][${counter++}]`] =
                  i.id;
              }
            });
            break;
          }
        }
      });
      return queryParams;
    },
    async setActiveGenre(id) {
      if (this.filters.searchGenre != id) {
        this.$store.commit("products/SET_MY_PRODUCTS", []);
      }
      this.filters.searchGenre = id;
      this.products = await this.fetchProducts();
    },
    async fetchProducts() {
      window.scrollTo(0, 0);
      const payloadData = this.createQueryParams();
      console.log(payloadData);
      this.products = await this.$store.dispatch(
        "products/fetchProductsBySearch",
        payloadData
      );

      this.getItemWidth();
    },
    createYears() {
      const tempYear = new Date().getFullYear();
      let i = 0;
      while (i <= 100) {
        const year = (tempYear - i).toString();
        this.$set(this.filters.years, this.filters.years.length, year);
        i += 1;
      }
    },
    resetFilters() {
      this.filters.newest = false;
      this.filters.topRated = false;
      this.filters.search = "";
      this.filters.selectedYears = [];
      this.filters.status = [
        {
          active: false,
          name: "Released",
          value: "released",
        },
        {
          active: false,
          name: "Unreleased",
          value: "unreleased",
        },
      ];
      forEach(this.filters.contentType, (type) => {
        type.active = false;
      });
      this.fetchProducts();
    },
    toggleYear(value) {
      const index = this.filters.selectedYears.indexOf(value);
      const haveInSelection = index >= 0;
      if (!haveInSelection) {
        this.$set(
          this.filters.selectedYears,
          this.filters.selectedYears.length,
          value
        );
        this.searchYears = "";
      } else {
        this.filters.selectedYears.splice(index, 1);
      }
      this.fetchProducts();
    },
    isSelected(year) {
      return this.filters.selectedYears.indexOf(year) >= 0;
    },
    clearSelectedYears() {
      this.filters.selectedYears = [];
      this.fetchProducts();
    },
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.getItemWidth);
  },
};
</script>

<style lang="scss" scoped>
.single-category {
  background: none;
  position: relative;
  .single-category-navigation {
    display: flex;
    height: 84px;
    align-items: center;
    .nav-icon-wrapper {
      align-items: center;
      display: flex;
      flex: 0 0 37px;
      height: 30px;
      margin-right: 20px;
      .nav-icon {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: 10px;
        width: 100%;
        span {
          background: #fff;
          height: 2px;
          width: 30px;
          &:last-child {
            align-self: flex-end;
          }
        }
      }
    }
    .navigations {
      align-items: center;
      display: flex;
      flex-wrap: nowrap;
      font-size: 18px;
      font-weight: 600;
      overflow-x: scroll;
      position: relative;
      top: 3px;
      width: calc(100% - 57px);
      span {
        &.active {
          color: #a30000;
          font-weight: 700;
        }
        padding: 0 23px;
      }
    }
  }
  .single-category-body {
    margin-top: 20px;
    position: relative;
    .single-category-content > div {
      display: grid;
      justify-content: center;
      grid-column-gap: 10px;
      grid-row-gap: 44px;
    }
  }
  .single-category-sidebar {
    background: #212529;
    bottom: 0;
    color: #fff;
    left: 0;
    opacity: 1;
    overflow-y: auto;
    padding-bottom: 20px;
    position: fixed;
    top: 0;
    transition: all 0.2s linear;
    transform: translateX(-100%);
    width: 246px;
    z-index: 9;
    &.active {
      box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.25);
      transform: translateX(0);
    }
    .single-category-sidebar-icon {
      position: absolute;
      right: 26px;
      top: 33px;
    }
    .single-category-sidebar-seller-platform {
      display: flex;
      justify-content: center;
      position: relative;
      margin-top: 93px;
      .seller-platform {
        background: #630e17;
        cursor: pointer;
      }
    }
    .single-category-sidebar-search,
    .single-category-sidebar-seller-platform,
    .single-category-sidebar-reset {
      display: flex;
      justify-content: center;
      position: relative;
    }
    .seller-platform,
    .search-holder,
    .reset {
      align-items: center;
      border-radius: 9px;
      color: #fff;
      display: flex;
      height: 45px;
      justify-content: center;
      width: 195px;
    }
    .reset,
    .search-holder,
    .search-holder .v-input__slot {
      background: #2b2e34 !important;
    }
    .filter-content {
      padding: 0 26px;
      position: relative;
    }
    .custom-autocomplete-wrapper {
      .custom-autocomplete {
        align-items: center;
        display: flex;
        background: #2b2e34;
        padding: 10px 0 10px 10px;
        border-radius: 7px;
        &.active {
          border-bottom-left-radius: 0;
          border-bottom-right-radius: 0;
        }
        .selection-and-input {
          width: calc(100% - 24px);
          .input-wrapper {
            align-items: center;
            display: flex;
            justify-content: space-between;
          }
          input {
            width: calc(100% - 24px);
            outline: 0;
            color: #fff;
          }
        }
        .input-wrapper,
        .custom-icons {
          button {
            height: 24px;
            width: 24px;
          }
        }
      }
    }
    .checkbox-containers {
      &.autocomplete {
        background-color: #2b2e34;
        left: 26px;
        max-height: 40vh;
        overflow-y: scroll;
        padding: 10px;
        position: absolute;
        right: 26px;
        top: 100%;
        z-index: 9;
      }
      .checkbox-container {
        align-items: center;
        display: flex;
        .checkbox {
          background: rgba(196, 196, 196, 0.3);
          height: 18px;
          margin-right: 15px;
          width: 18px;
          position: relative;
          border-radius: 5px;
          &.active {
            background: #630e17;
            .v-icon {
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
            }
          }
        }
        > span {
          font-size: 18px;
          font-weight: 500;
        }
      }
      > small {
        font-size: 10px;
        text-decoration: underline;
      }
    }
  }
  .pointer {
    cursor: pointer;
  }
  .spinner-wrapper {
    align-items: center;
    bottom: 0;
    display: flex;
    justify-content: center;
    left: 0;
    position: fixed;
    right: 0;
    top: 0;
    z-index: 3;
  }
}
</style>
