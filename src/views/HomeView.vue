<script setup>
import { usePostsStore } from '@/stores/posts';
import { onMounted, ref } from 'vue';

const { getAllPosts } = usePostsStore()
const posts = ref([])

onMounted(async () => (posts.value = await getAllPosts()))

</script>

<template>
  <main>
    <h1>Latest posts</h1>
    <div v-if="posts.length > 0">

      <table class="table table-sm">
        <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Body</th>
            <th>By</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="post in posts" :key="post.id">
            <td>{{ post.id }}</td>
            <td>{{ post.title }}</td>
            <td>{{ post.body }}</td>
            <td>{{ post.user.name }}</td>
            <td>

              <RouterLink :to="{ name: 'show', params: { id: post.id } }" class="nav-link text-info">
                Read more...
              </RouterLink>

            </td>
            <td></td>
          </tr>
        </tbody>
      </table>

    </div>
    <div v-else>
      <p>Aucun post n'est trouvé!</p>
    </div>
  </main>
</template>
