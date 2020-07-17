<template>
  <div class="main-wrap">
    <div class="chips-wrap" :class="{'active': isFocus}" @click="isFocus = true">
      <span class="chip-item" v-for="(chip, i) in chips" :key="i">
        {{ chip }}
        <span class="close" @click="closeChip(i)"><span>+</span></span>
      </span>
      <span class="input-wrap">
        <input ref="input"
               v-model="inputText"
               @blur="blur"
               @focus="isFocus=true"
               @input="input"
               @keyup.delete="backSpace"
               @keyup.enter="enter"
               @keyup.up="toUp"
               @keyup.down="toDown"/>
      </span>
    </div>
    <div class="list-wrap" :class="{'active': showList}">
      <ul>
        <template v-for="(item, i) in filterItems">
          <li :class="{'active': i == activeItem}" :key="item.id" @click="clickElem(i)">
            {{ item.name | capitalize | cutLetter }}
          </li>
        </template>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      inputText: '',
      chips: [],
      itemsList: [],
      isFocus: false,
      activeItem: 0,
      showList: false
    }
  },
  computed: {
    filterItems() {
      return this.itemsList.filter(item => item.name.toLowerCase().indexOf(this.inputText.toLowerCase()) !== -1)
    }
  },
  methods: {
    closeChip(i) {
      this.chips.splice(i, 1);
    },
    input() {
      this.activeItem = 0
      this.showList= true
      this.isFocus = true;
    },
    blur() {
      this.isFocus = false;
      this.activeItem = 0;
    },
    clickElem(i) {
      this.chips.push(this.filterItems[i].name)
      this.showList = false
      this.inputText = ''
      this.$refs.input.focus()
    },
    backSpace() {
      if (!this.inputText && this.chips.length > 0) {
        this.chips.pop();
        this.isFocus = true;
      }
    },
    enter() {
      this.chips.push(this.filterItems[this.activeItem].name)
      this.inputText = ''
      this.filterItems.splice(this.activeItem, 1)
    },
    toUp() {
      if (this.activeItem == 0) return
      this.activeItem--;
    },
    toDown() {
      if (this.activeItem == this.itemsList.length - 1) return
      this.activeItem++;
    }
  },
  beforeMount() {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(json => {
        this.itemsList = json;
      })
  }
}
</script>

<style lang="scss" scoped>
.main-wrap {
  .chips-wrap {
    border: 1px solid $chip-bcg;
    padding: 0.3rem;
    border-radius: 0.2rem;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    &.active {
      border-color: $color-primary;
      background-color: $color-grey;
    }
    .chip-item {
      display: inline-block;
      margin: 0.1rem 0.2rem;
      padding: 0.1rem 0.5rem;
      border-radius: 0.2rem;
      background-color: $chip-bcg;
      display: flex;
      align-items: center;
      .close {
        cursor: pointer;
        padding: 0.1rem;
        cursor: pointer;
        font-weight: 900;
        display: inline-block;
        margin-left: 0.4rem;
        overflow: hidden;
        &:hover {
          span {
            transition: all 0.2s linear;
            color: $color-secondary;
          }
        }
        & > span {
          display: inline-block;
          transform: rotate(45deg);
        }
      }
    }
    .input-wrap {
      flex: 1 1 auto;
      width: 3rem;
      display: flex;
      align-items: center;
      height: 2rem;
      input {
        width: 100%;
        font: inherit;
        padding-left: 0.4rem;
        background-color: transparent;
      }
    }
  }
  .list-wrap {
    display: none;
    &.active {
      display: block;
    }
    & > ul {
      & > li {
        cursor: pointer;
        background-color: $color-grey;
        padding: 0.7rem;
        &.active {
          background-color: $chip-bcg;
        }
      }
    }
  }
}
</style>
