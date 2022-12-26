<template>

  <header class="header">
    <a href="#">
      <img src="/icons/applogo.svg" alt="app logo"/>
    </a>
  </header>

  <main>
    <div class="container">
      <div class="title">
        <h1 class="unselectable">Сотрудники</h1>
        <company-profile style="margin-right: 20px;" name="ООО «Модуль»" logo="/icons/companylogo.svg"/>
      </div>

      <app-toolbar>
        <template #left>
          <app-button icon="/icons/manplus.svg" type="primary">
            Добавить сотрудника
          </app-button>
          <app-button icon="/icons/cicrleplus.svg" type="tertiary">
            Создать новый отдел
          </app-button>
        </template>

        <template #right>
          <app-button type="secondary"> Скачать список прошедших</app-button>
          <app-button type="secondary"> Экспорт</app-button>
          <app-button icon="/icons/upload.svg" type="secondary">
            Загрузить списком
          </app-button>
        </template>
      </app-toolbar>

      <div class="filters">
        <app-input type="search" placeholder="Поиск по ФИО" v-model="term"/>
      </div>

      <app-table :term="term"/>

    </div>
  </main>
</template>

<script>
import CompanyProfile from '@/components/CompanyProfile.vue';
import AppButton from '@/components/AppButton.vue';
import AppInput from '@/components/AppInput.vue';
import AppToolbar from '@/components/AppToolbar.vue';
import AppTable from '@/components/AppTable.vue';

export default {
  name: 'app',
  components: {
    AppTable,
    CompanyProfile,
    AppButton,
    AppInput,
    AppToolbar,
  },
  data() {
    return {
      term: ''
    };
  }
};
</script>

<style lang="scss">
.filters {
  .app-input {
    width: 304px;
    margin-bottom: 30px;

    @include mobile {
      width: 100%;
    }
  }
}

.app-toolbar {
  margin-bottom: 30px;
}

.container {
  padding: 0 30px;
  max-width: 1180px;
  margin: 0 auto;

  @include to-desktop {
    padding: 0 15px;
  }
}

.header {
  @include to-desktop {
    width: 100%;
    height: 60px;
    padding: 5px 15px;
    position: sticky;

    box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.1);
  }

  height: 100vh;
  width: 88px;
  border-right: 1px solid $color-border;
  box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.1);
  padding: 48px 20px;
  background-color: $color-white;
  position: fixed;
}

.title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;

}
</style>
