<template>
	<div class="hello">
	  <h1>Hello,{{ $route.params.id }}</h1>
     <div class="hello">
       <el-radio v-model="radio" label="1">备选项</el-radio>
       <el-radio v-model="radio" label="2">备选项</el-radio>
     </div>
	</div>
</template>

<script>

	export default{
		name:'HelloWorld2',
		data(){
		  return {
			msg:'Hello World',
      radio: '1'
		}
	}
	}
</script>

<style>
</style>
