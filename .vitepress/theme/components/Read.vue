<script setup lang="ts">
import axios from "axios";
import {useRoute} from "vitepress";

const route = useRoute()
console.log('%c route ','color:white;background:red',route)
axios.post('/read', {
  path:decodeURIComponent(route.path).replace(/\.html$/,'')
})
</script>
