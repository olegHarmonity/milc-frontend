<template>
  <div id="app-feedback" class="page">
    <!-- Title -->
    <h1 class="page-title">{{ $t("feedback.title") }}</h1>

    <!-- Main -->
    <FeedbackTable />
  </div>
</template>

<script>
import FeedbackTable from "@/components/admin/feedback/FeedbackTable.vue";

export default {
  components: { FeedbackTable },
};
</script>

<style></style>
