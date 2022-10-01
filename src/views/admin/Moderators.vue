
<template>
  <div class="content info-bg">
    <div class="layout admin">  
      <h3 class="layout__title">Модеры</h3>
      <h4 class="item">
        {{user.first_name }} {{user.last_name }}
      </h4>
    </div>
  </div>
</template>

<script>
import { getUsers } from '../../api/user';

export default {
  name: 'Moderators',
  data () {
    return {
      users: []
    }
  }, 
  async mounted () {
    const {data} = await getUsers()
    this.users = data
  }
}
</script>

<style scoped>
  .item {
    cursor: pointer;
    color: #375eb3;
  }

  .item:hover {
    color: #4572d4;
  }
</style>
 