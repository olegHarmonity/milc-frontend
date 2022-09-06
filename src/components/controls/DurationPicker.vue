<template>
  <v-menu
    v-model="menu"
    :close-on-content-click="false"
    transition="scale-transition"
    offset-y
    min-width="auto"
  >
    <template v-slot:activator="{}">
      <!-- Text field -->
      <v-text-field
        v-model="durationInput"
        v-bind="$attrs"
        v-mask="'##:##:##'"
        append-icon="mdi-clock-outline"
        placeholder="hh:mm:ss"
        clearable
        @click:append="menu = !menu"
        @click:clear="durationInput = null"
      ></v-text-field>
    </template>

    <v-card color="secondary" class="duration-picker pa-5">
      <v-row>
        <v-col v-for="(unit, i) in ['hours', 'minutes', 'seconds']" :key="i">
          <!-- Button increase -->
          <v-btn color="primary" small @click="increase(unit)">
            <v-icon>mdi-chevron-up</v-icon>
          </v-btn>

          <!-- Unit value -->
          <div class="text-center my-4">
            {{ formatUnit(duration[unit]) }} {{ unit[0] }}
          </div>

          <!-- Button decrease -->
          <v-btn
            color="primary"
            small
            @click="decrease(unit)"
            :disabled="duration[unit] < 1"
          >
            <v-icon>mdi-chevron-down</v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-card>
  </v-menu>
</template>

<script>
import dayjs from "dayjs";

export default {
  props: {
    value: {
      type: Number,
    },
  },

  data() {
    return {
      menu: false,
    };
  },

  computed: {
    durationInput: {
      get() {
        return this.value ? this.secondsToInput(this.value) : "";
      },
      set(input) {
        if (!input) {
          this.$emit("input", null);
        } else if (this.isValidInput(input)) {
          this.$emit("input", this.inputToSeconds(input));
        }

        this.$forceUpdate();
      },
    },
    duration: {
      get() {
        return this.secondsToDuration(this.value);
      },
      set(duration) {
        this.$emit("input", this.durationToSeconds(duration));
      },
    },
  },

  methods: {
    inputToDuration(input) {
      const [h, m, s] = input.split(":");

      return {
        hours: Number(h),
        minutes: Number(m),
        seconds: Number(s),
      };
    },

    inputToSeconds(input) {
      return this.durationToSeconds(this.inputToDuration(input));
    },

    secondsToInput(secs) {
      if (!secs) {
        return "";
      }

      const duration = this.secondsToDuration(secs);

      const hours = this.formatUnit(duration.hours);
      const minutes = this.formatUnit(duration.minutes);
      const seconds = this.formatUnit(duration.seconds);

      return `${hours}:${minutes}:${seconds}`;
    },

    secondsToDuration(seconds) {
      if (!seconds) {
        return {
          hours: 0,
          minutes: 0,
          seconds: 0,
        };
      }

      seconds = Number(seconds);

      const duration = {
        hours: Math.floor(seconds / 3600),
        minutes: Math.floor((seconds % 3600) / 60),
        seconds: Math.floor((seconds % 3600) % 60),
      };

      return duration;
    },

    durationToSeconds(duration) {
      return dayjs
        .duration({
          hours: duration.hours,
          minutes: duration.minutes,
          seconds: duration.seconds,
        })
        .asSeconds();
    },

    increase(unit) {
      const dur = this.duration;
      ++dur[unit];

      this.duration = dur;
    },

    decrease(unit) {
      const dur = this.duration;
      --dur[unit];

      this.duration = dur;
    },

    formatUnit(val) {
      if (String(val).length === 1) {
        return "0" + String(val);
      }

      return val;
    },

    isValidInput(input) {
      return this.rule.duration(input) === true;
    },
  },
};
</script>

<style lang="scss"></style>
