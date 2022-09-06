<template>
  <div id="app-notifications" class="page">
    <!-- Title -->
    <h1 class="page-title">{{ $t("notifications.title") }}</h1>

    <NotificationsList />
  </div>
</template>

<script>
import NotificationsList from "@/components/app/notifications/NotificationsList.vue";

export default {
  components: { NotificationsList },
};
</script>

<style></style>
