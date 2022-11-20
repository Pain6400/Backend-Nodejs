<template>
  <q-page padding>
    <q-btn @click="access">Ingresar</q-btn>
    <q-btn @click="createLink">Crear Link</q-btn>
    {{ token }}
  </q-page>
</template>

<script setup>
import { api } from "src/boot/axios";
import { ref } from "vue";

const token = ref("");

const access = async () => {
  try {
    const res = await api.post("/auth/login", {
      email: "kevin4@gmail.com",
      password: "123456",
    });
    token.value = res.data.tokenInfo.token;
  } catch (error) {
    console.log(error);
  }
};

const createLink = async () => {
  try {
    const res = await api({
      method: "POST",
      url: "/links",
      headers: {
        Authorization: "Bearer " + token.value,
      },
      data: {
        longLink: "https://www.youtube.com/watch?v=53VBlv7K-BI&t=1705s",
      },
    });

    console.log(res.data);
  } catch (error) {
    console.log(error);
  }
};

const refreshToken = async () => {
  try {
    const res = await api.get("/auth/refreshToken");
    token.value = res.data.tokenInfo.token;
  } catch (error) {
    console.log(error);
  }
};

refreshToken();
</script>
