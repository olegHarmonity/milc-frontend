<template>
  <div id="admin-dashboard">
    <div class="dashboard-header">
      <div class="header-title">
        <h1>Dashboard</h1>
      </div>
      <div class="header-boxes">
        <HeaderBox
          v-for="(box, key) in boxes"
          :key="key"
          :icon="box.icon"
          :numbers="getBoxNumbers(box.numbers)"
          :title="box.title"
        />
      </div>
    </div>
    <div class="dashboard-body">
      <section class="dashboard-registrations">
        <h3 class="dashboard-title">Pending registrations requests</h3>
        <v-data-table
          class="row-clickable"
          v-if="pendings"
          :headers="pendingRegistrationsRequests.headers"
          :items="pendings"
          item-key="name"
          @click:row="(item) => rowClick(item)"
          :hide-default-footer="true"
          disable-sort
        >
          <!-- Status -->
          <template v-slot:item.status="{ value }">
            {{ $t("labels." + value) }}
          </template>
        </v-data-table>
      </section>
      <section class="dashboard-profit-products">
        <div class="dashboard-profit">
          <div class="dashboard-profit-titles">
            <h3 class="dashboard-title">Profit percentages</h3>
            <h5>Lorem ipsum dolor sit amet.</h5>
          </div>
          <div class="donut-chart-wrapper">
            <div class="donut-chart-info">
              <ul>
                <li
                  v-for="(item, index) in profitPercentages"
                  :key="`percentage-${index}`"
                >
                  <div>{{ item.name }}</div>
                  <div>{{ item.value }}%</div>
                </li>
              </ul>
            </div>
            <div class="donut-chart">
              <div id="chart">
                <apexchart
                  type="donut"
                  :options="chartOptions"
                  height="200px"
                  :series="series"
                ></apexchart>
              </div>
            </div>
          </div>
        </div>
        <div class="dashboard-products">
          <h3 class="dashboard-title">Latest Products</h3>
          <h5>Lorem ipsum dolor sit amet.</h5>
          <v-data-table
            v-if="products"
            :headers="latestProducts.headers"
            :items="products.data"
            item-key="name"
            :hide-default-footer="true"
            disable-sort
          >
            <!-- Status -->
            <template v-slot:item.status="{ value }">
              {{ $t("labels." + value) }}
            </template>

            <!-- Created_at -->
            <template v-slot:item.created_at="{ item }">
              {{ $dayjs(item.created_at).format("DD.MM.YYYY") }}
            </template>
          </v-data-table>
        </div>
      </section>
      <section class="dashboard-orders">
        <h3 class="dashboard-title">Latest orders</h3>
        <v-data-table
          v-if="orders"
          :headers="latestOrders.headers"
          :items="orders.data"
          item-key="name"
          :hide-default-footer="true"
          disable-sort
        >
          <!-- Created_at -->
          <template v-slot:item.created_at="{ value }">
            {{ $dayjs(value).format("DD.MM.YYYY") }}
          </template>

          <!-- Price -->
          <template v-slot:item.price.value="{ item, value }">
            {{ $formatMoney(value, item.price.currency) }}
          </template>

          <!-- State -->
          <template v-slot:item.state="{ value }">
            {{ $t("orders.state." + value) }}
          </template>
        </v-data-table>
      </section>
    </div>
  </div>
</template>

<script>
import map from "lodash/map";
import HeaderBox from "@/components/admin/dashboard/HeaderBox";

export default {
  name: "Dashboard",
  components: { HeaderBox },
  data() {
    return {
      boxes: [
        {
          title: "Organisations",
          numbers: "organisations",
          icon: "account-supervisor",
        },
        {
          title: "Products",
          numbers: "products",
          icon: "popcorn",
        },
        {
          title: "Orders",
          numbers: "orders",
          icon: "chart-box",
        },
      ],
      pendingRegistrationsRequests: {
        headers: [
          {
            text: "User",
            align: "start",
            value: "organisation_name",
          },
          {
            text: "Organization",
            value: "organisation_type.name",
          },
          {
            text: "Email",
            value: "email",
          },
          {
            text: "Registration",
            value: "registration_number",
          },
          {
            text: "Status",
            value: "status",
          },
        ],
      },
      latestProducts: {
        headers: [
          {
            text: "Order ID",
            align: "start",
            value: "id",
          },
          {
            text: "Order",
            value: "title",
          },
          {
            text: "Order date",
            value: "created_at",
          },
          {
            text: "Status",
            value: "status",
          },
        ],
      },
      latestOrders: {
        headers: [
          {
            text: "Order ID",
            align: "start",
            value: "order_number",
          },
          {
            text: "Order",
            value: "rights_bundle.product.title",
          },
          {
            text: "Order date",
            value: "created_at",
          },
          {
            text: "Customer",
            value: "organisation_name",
          },
          {
            text: "Price",
            value: "price.value",
          },
          {
            text: "Status",
            value: "state",
          },
        ],
      },
      profitPercentages: [
        {
          name: "Conversions",
          value: "25",
        },
        {
          name: "Net profit",
          value: "35",
        },
        {
          name: "Yield",
          value: "40",
        },
      ],
      series: [],
      chartOptions: {
        dataLabels: {
          enabled: false,
        },
        chart: {
          type: "donut",
        },
        legend: {
          show: false,
        },
        stroke: {
          show: false,
        },
        labels: ["Conversions", "Net profit", "Yield"],
        colors: ["#630e17", "#56a0a5", "#c6c6c6"],
      },
      products: null,
      orders: null,
      organisations: null,
      pendings: null,
    };
  },
  methods: {
    async fetchOrders() {
      const { data } = await this.$store.dispatch("orders/fetchAll", {
        page: 1,
        per_page: 4,
      });
      return data;
    },
    async fetchProducts() {
      const { data } = await this.$store.dispatch("products/fetchAll", {
        page: 1,
        per_page: 3,
      });
      return data;
    },
    async fetchOrganisations() {
      const { data } = await this.$store.dispatch("organisations/fetchAll", {
        page: 1,
        per_page: 1,
      });
      return data;
    },
    async searchOrganisations() {
      const { data } = await this.$store.dispatch("organisations/search", {
        page: 1,
        per_page: 3,
        "exact_search[status]": "pending",
      });
      return data.data;
    },
    getBoxNumbers(name) {
      return this[name]?.total || 0;
    },
    rowClick(row) {
      this.$router.push({
        name: "admin.organisations.view",
        params: { id: row.id },
      });
    },
  },
  async mounted() {
    this.organisations = await this.fetchOrganisations();
    this.pendings = await this.searchOrganisations();
    this.orders = await this.fetchOrders();
    this.products = await this.fetchProducts();
    this.series = await map(this.profitPercentages, (item) => +item.value);
  },
};
</script>

<style lang="scss">
#admin-dashboard {
  tbody {
    tr {
      cursor: pointer;
      &:hover {
        background: #630e17;
      }
    }
  }
  .dashboard-header {
    display: flex;
    flex-direction: column;
    @media (min-width: 768px) {
      flex-direction: row;
      justify-content: space-between;
    }
    .header-title,
    .header-boxes {
      flex: 0 1 50%;
    }
    .header-boxes {
      display: grid;
      grid-column-gap: 25px;
      grid-row-gap: 25px;
      @media (min-width: 520px) {
        grid-template-columns: repeat(3, 150px);
        justify-content: flex-end;
      }
    }
  }
  .dashboard-body {
    section {
      padding-top: 57px;
    }
    h5 {
      color: #c6c6c6;
      font-size: 8px;
      font-weight: 400;
    }
    .dashboard-title {
      padding-bottom: 20px;
    }
    .dashboard-profit {
      height: 316px;
      max-width: 313px;
      .dashboard-profit-titles {
        height: 45px;
      }
      .donut-chart-wrapper {
        align-items: center;
        height: calc(100% - 45px);
        display: flex;
        .donut-chart-info {
          width: 90px;
          ul {
            list-style: none;
            padding: 0;
          }

          li {
            font-size: 12px;
            position: relative;
            &:first-child:before {
              color: #630e17;
            }
            &:nth-child(2):before {
              color: #56a0a5;
            }
            &:last-child:before {
              color: #c6c6c6;
            }
            &:before {
              content: "\2022";
              font-weight: bold;
              display: inline-block;
              position: absolute;
              left: -17px;
              display: inline-block;
              font-size: 17px;
              top: -3px;
            }
          }
        }
        .donut-chart {
          width: calc(100% - 90px);
        }
      }
    }
    .dashboard-profit-products {
      display: grid;
      grid-column-gap: 25px;
      grid-row-gap: 25px;
      @media (min-width: 1024px) {
        grid-template-columns: 313px auto;
      }
    }
    .dashboard-profit,
    .dashboard-products {
      background: #212529;
      border-radius: 9px;
      padding: 24px 28px;
      h3 {
        padding-bottom: 0px;
      }
    }
  }
}
</style>
