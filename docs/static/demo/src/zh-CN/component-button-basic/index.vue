  <template>      <div class="demo-real">          
<PtButton>Button</PtButton>
      </div>  </template>        <style scoped>  
.btn-action{
    color: red;
}
  </style>        <script>  /* eslint-disable */  
import Vue from 'vue';
import { PtButton } from 'putiui';

Vue.use(PtButton);

export default {
    name: 'demo',
    data(){
        return {
            message:'Hello'
        }
    }
}
  </script>    