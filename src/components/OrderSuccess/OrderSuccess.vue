<template>
  <div class="order-success">
    <v-dialog v-model="dialog" width="50%" persistent>
      <v-card class="text-center py-7">
        <div class="parent text-center">
          <v-icon
            size="75"
            color="green"
            style="
              color: green;
              background-color: white;
              font-size: 76px;
              border: 1px solid green;
              border-radius: 50%;
            "
            >mdi-check</v-icon
          >
        </div>
        <v-card-title
          style="font-size: 30px; font-weight: bold; color: #000000a3"
          >Order Placed Successfuly!</v-card-title
        >
        <v-card-text
          style="font-size: 18px; color: #000000a3"
          class="text-center"
          >Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ad alias
          earum quibusdam quae ipsum tenetur in beatae vitae? Quibusdam impedit
          recusandae molestiae fugit iste quam nulla. Voluptates ex magni
          hic!</v-card-text
        >
        <v-card-actions class="mt-5 justify-center">
          <v-btn @click="resetData" variant="elevated" color="blue"
            >Got it!</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import { cartStore } from "@/stores/cart";
import { mapActions } from "pinia";
export default {
  methods: {
    ...mapActions(cartStore, ["resetItems"]),
    resetData() {
      this.resetItems();
      this.dialog = false;
      this.$router.push({ name: "home" });
    },
  },
  data: () => ({
    dialog: false,
  }),
  props: {
    popup: {
      type: Boolean,
    },
  },
  watch: {
    dialog(newVal) {
      if (!newVal) {
        setTimeout(() => {
          this.$emit("close-popup");
        }, 200);
      }
    },
  },
  mounted() {
    this.dialog = this.popup;
  },
};
</script>
