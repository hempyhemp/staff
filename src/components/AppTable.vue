<template>

  <div class="app-table">
    <p class="unselectable">
      Показаны записи
      <strong>{{ currentPage }} - {{ totalPages }}</strong>
      из
      <strong>{{ totalPages }}</strong>.
    </p>

    <div class="table-wrapper">
      <table>
        <colgroup>
          <col style="width: 50px;">
          <col style="width: 23%;">
          <col style="width: 20%;">
          <col style="width: 12%;">
          <col style="width: 12%;">
          <col style="width: 12%;">
          <col>
        </colgroup>
        <thead>
        <tr>
          <th class="checkbox-cell">
            <app-checkbox value="all" :model-value="checkAll" @update:modelValue="selectAll"/>
          </th>
          <th>ФИО</th>
          <th>Должность</th>
          <th>Статус МО</th>
          <th>Дата записи</th>
          <th>Дата прохождения</th>
          <th></th>
        </tr>
        </thead>

        <tbody v-for="category in filteredCategories" :key="category.id">
        <tr @click="hideCategory(category)">
          <td class="category-title" colspan="6">
            <span class="unselectable">{{ category.name }}</span>
            <span class="count unselectable">{{ category.staff.length }}</span>
          </td>
          <td class="row-actions">
            <div style="padding-top: 12px; padding-bottom: 0;"> <!-- TODO -->
              <app-button :icon="$getImageURL('/icons/edit.svg')" type="actions" @click.stop=""/>
              <app-button :icon="$getImageURL('/icons/delete.svg')" type="actions" @click.stop=""/>
              <app-button
                  :icon="$getImageURL('/icons/arrow.svg')"
                  type="actions"
                  :class="{ hide: category.isHidden }"/>
            </div>

          </td>
        </tr>


        <tr class="user-row" v-for="user in getFilteredUsers(category.staff)"
            :key="user.id"
            v-show="!category.isHidden"
        >
          <td class="checkbox-cell">
            <app-checkbox :model-value="isChecked(user)" @update:modelValue="checkUser(user)"/>
          </td>
          <td>{{ user.name }}</td>
          <td>{{ user.position }}</td>
          <td class="status">{{ user.status }}</td>
          <td>{{ user.recordDate }}</td>
          <td>{{ user.visitDate }}</td>
          <td class="row-actions">
            <div>
              <div class="user-actions">
                <app-button :icon="$getImageURL('/icons/change.svg')" type="actions" @click.stop=""/>
                <app-button @click.stop="remove(category, user)" :icon="$getImageURL('/icons/delete.svg')"
                            type="actions"/>
              </div>

              <app-button :icon="$getImageURL('/icons/arrow right.svg')" type="actions"/>
            </div>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import AppCheckbox from '@/components/AppCheckbox.vue';
import AppButton from '@/components/AppButton.vue';

export default {
  name: 'AppTable',
  components: {
    AppCheckbox,
    AppButton,
  },
  props: {
    term: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      categories: [
        {
          id: 1,
          isHidden: false,
          name: 'Отдел продаж',
          staff: [
            {
              id: 1,
              name: 'Сергеевич Сергей Сергачук',
              position: 'Главный продавец',
              status: 'Проходит',
              recordDate: '05.09.2022',
              visitDate: '06.06.2022'
            },
            {
              id: 2,
              name: 'Максимович Максим Максидом',
              position: 'Продавец',
              status: 'Проходит',
              recordDate: '05.09.2022',
              visitDate: '06.06.2022'
            },
            {
              id: 3,
              name: 'Иванов Иван Иванович',
              position: 'Продавец',
              status: 'Проходит',
              recordDate: '05.09.2022',
              visitDate: '06.06.2022'
            },
          ]
        },
        {
          id: 2,
          isHidden: false,
          name: 'Склад',
          staff: [
            {
              id: 4,
              name: 'Оби Обиван Кеноби',
              position: 'Кладовщик',
              status: 'Проходит',
              recordDate: '05.09.2022',
              visitDate: '06.06.2022'
            },
            {
              id: 5,
              name: 'Тупак Амару Шакур',
              position: 'Кладовщик',
              status: 'Проходит',
              recordDate: '05.09.2022',
              visitDate: '06.06.2022'
            },
            {
              id: 6,
              name: 'Максимович Максим Максидом',
              position: 'Главный кладовщик',
              status: 'Проходит',
              recordDate: '05.09.2022',
              visitDate: '06.06.2022'
            },
            {
              id: 7,
              name: 'Иванов Иван Иванович',
              position: 'Кладовщик',
              status: 'Проходит',
              recordDate: '05.09.2022',
              visitDate: '06.06.2022'
            },
            {
              id: 8,
              name: 'Иванов Иван Иванович',
              position: 'Кладовщик',
              status: 'Проходит',
              recordDate: '05.09.2022',
              visitDate: '06.06.2022'
            },
            {
              id: 9,
              name: 'Иванов Иван Иванович',
              position: 'Кладовщик',
              status: 'Проходит',
              recordDate: '05.09.2022',
              visitDate: '06.06.2022'
            },
          ]
        },
      ],
      currentPage: 1,
      totalPages: 113,
      checkAll: null,
      checkedItems: [],
    };
  },
  methods: {
    remove(category, user) {
      category.staff = category.staff.filter(usr => user.id !== usr.id);
    },
    hideCategory(category) {
      category.isHidden = !category.isHidden;
    },
    getFilteredUsers(users) {
      return users.filter(user => user.name.toLowerCase().includes(this.term.toLowerCase()));
    },
    checkUser(user) {
      if (this.isChecked(user)) {
        this.checkedItems = this.checkedItems.filter(id => id !== user.id);
      } else {
        this.checkedItems.push(user.id);
      }
    },
    isChecked(user) {
      return this.checkedItems.includes(user.id);
    },
    selectAll(value) {
      this.checkedItems = value ? this.userIds : [];
    }
  },
  computed: {
    userIds() {
      return this.categories.reduce((ids, category) => {
        return ids.concat(category.staff.map(user => user.id));
      }, []);
    },
    filteredCategories() {
      if (!this.term) return this.categories;
      return this.categories.filter(category => category.staff.some(user => user.name.toLowerCase().includes(this.term.toLowerCase())));
    }
  },
  watch: {
    'checkedItems.length'(value) {
      this.checkAll = value === this.userIds.length;
    }
  }
};
</script>

<style lang="scss">
.app-table {
  .table-wrapper {
    margin-left: -20px;
    margin-right: -24px;
    overflow-x: auto;

    @include mobile {
      margin-left: -15px;
      margin-right: -15px;
    }
  }

  table {
    width: 100%;
    border-spacing: 0;
    table-layout: fixed;

    @include mobile {
      width: 1180px;
    }

  }

  th, td {
    text-align: left;
    padding: 10px 8px 8px;
    border-bottom: 1px solid $color-border;

    &:first-child {
      padding-left: 20px;
    }

    &:last-child {
      padding-right: 24px;
    }
  }

  th {
    height: 54px;
    line-height: 16px;
    font-size: 12px;
    font-weight: 400;
    color: $color-red;
    vertical-align: bottom;
  }

  .category-title {
    height: 54px;
    line-height: 28px;
    font-size: 16px;
    font-weight: 500;
    padding-bottom: 0;
    padding-top: 20px;

    .count {
      color: $color-red;
      margin-left: 8px;
    }
  }

  tbody {
    .user-row {
      &:not(:hover) {
        .user-actions {
          display: none;
        }
      }
    }

    tr {
      height: 40px;
      transition: all 0.18s ease-out;
      cursor: pointer;

      &:hover {
        background-color: $table-color-active;
      }
    }

    &:last-of-type {
      tr {
        &:last-child {
          td {
            border: none;
          }
        }
      }
    }

    .hide {
      transform: rotateX(180deg);
      //  TODOtranslate(-1px, 0px)
    }

    .status {
      color: $color-status;
    }
  }

  .row-actions {
    text-align: right;

    div {
      display: flex;
      justify-content: flex-end;
    }

    button {
      margin-left: 10px;
    }
  }
}

.stats {
  line-height: 21px;
  font-size: 16px;
  font-weight: 400;
  margin-left: 20px;

}

</style>