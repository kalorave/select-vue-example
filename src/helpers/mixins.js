import Vue from 'vue'

Vue.filter('capitalize', function (value) {
  if (!value) return ''
  value = value.toString()
  return value.charAt(0).toUpperCase() + value.slice(1)
})

Vue.filter('cutLetter', function(value, len = 20, suffix = '...') {
  if (!value) return '';

  if (value.length > len) return value.substr(0, len) + suffix;

  return value;
})
