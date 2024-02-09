<script setup lang="ts">
import {
  Card,
  CardContent,
  CardHeader,
} from '@/components/ui/card'
import { Tabs, TabsList, TabsTrigger, TabsTriggerSelect } from '@/components/ui/tabs'
import Chart from './components/Chart.vue'
import { ref } from 'vue';
import { DataRecord, DisplayType, data } from './components/data';
const month = ref(1)

const tabs = ref<DisplayType>(DisplayType.Monthly);
const chartData = ref<DataRecord[]>(data(month.value || 1, tabs.value, 'income'))
const chartDataExpense = ref<DataRecord[]>(data(month.value || 1, tabs.value, 'expense'))

const onTabChange = (val: string) => {
  chartData.value = data(month.value, val as DisplayType, 'income')
  chartDataExpense.value = data(month.value, val as DisplayType, 'expense')
}

const onMonthChange = (month: number) => {
  chartData.value = data(month, DisplayType.Monthly, 'income')
  chartDataExpense.value = data(month, DisplayType.Monthly, 'expense')
}

</script>

<template>
  <Card style="width: 1000px; min-height: 500px; margin: 100px auto;">
    <CardHeader class="border-b py-2">
      <div class="flex">
        <div class="w-full flex items-center">
          <span class="mr-6">Net Cashflow</span>
          <div class="flex legend">
            <div class="mr-5 text-sm flex items-center"><span class="legend-icon inline-block bg-greenAccent mr-2"></span>
              Income</div>
            <div class="text-sm flex items-center"><span class="legend-icon inline-block bg-grayAccent mr-2"></span>
              Expense</div>
          </div>
        </div>
        <div class="w-8/12 flex justify-end">
          <Tabs default-value="monthly" v-model="tabs" @update:model-value="onTabChange">
            <TabsList class="w-full">
              <TabsTriggerSelect :value="DisplayType.Monthly" v-model="month" @update:model-value="onMonthChange">
              </TabsTriggerSelect>
              <TabsTrigger :value="DisplayType.Quarter">
                Quarter
              </TabsTrigger>
              <TabsTrigger :value="DisplayType.Anually">
                Anually
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>
    </CardHeader>
    <CardHeader class="border-b p-0">
      <div class="columns-2">
        <div class="border-r p-6 py-3">
          <div class="flex items-center">
            <svg class="mr-2" width="46" height="46" viewBox="0 0 46 46" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="23" cy="23" r="23" fill="#A9CB01" />
              <path fill-rule="evenodd" clip-rule="evenodd"
                d="M27.1481 26.2963C27.6186 26.2963 28 26.6777 28 27.1481C28 27.6186 27.6186 28 27.1481 28L18.6296 28C18.1592 28 17.7778 27.6186 17.7778 27.1481L17.7778 18.6296C17.7778 18.1592 18.1592 17.7778 18.6296 17.7778C19.1001 17.7778 19.4815 18.1592 19.4815 18.6296L19.4815 25.0916L26.5458 18.0273C26.8785 17.6946 27.4178 17.6946 27.7505 18.0273C28.0832 18.3599 28.0832 18.8993 27.7505 19.232L20.6862 26.2963L27.1481 26.2963Z"
                fill="black" />
            </svg>
            <div class="flex flex-col">
              <span class="text-xs text-gray-500">Income</span>
              <div class="flex items-center">
                <div class="font-mono mr-3">$21,500</div>
                <div class="flex">
                  <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"
                    class="mr-1">
                    <circle cx="7.5" cy="7.5" r="7.5" fill="#427A50" />
                    <path fill-rule="evenodd" clip-rule="evenodd"
                      d="M7.5 11C7.20712 11 6.9697 10.7626 6.9697 10.4697L6.9697 5.81057L4.90528 7.87498C4.69819 8.08208 4.36242 8.08208 4.15532 7.87498C3.94823 7.66788 3.94823 7.33211 4.15532 7.12502L7.12502 4.15532C7.33212 3.94823 7.66788 3.94823 7.87498 4.15532L10.8447 7.12502C11.0518 7.33212 11.0518 7.66788 10.8447 7.87498C10.6376 8.08208 10.3018 8.08208 10.0947 7.87498L8.0303 5.81057L8.0303 10.4697C8.0303 10.7626 7.79288 11 7.5 11Z"
                      fill="white" />
                  </svg>
                  <span class="text-xs">+$328</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="pl-2 py-3">
          <div class="flex items-center">
            <svg class="mr-2" width="46" height="46" viewBox="0 0 46 46" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M46 23C46 35.7025 35.7025 46 23 46C10.2975 46 0 35.7025 0 23C0 10.2975 10.2975 0 23 0C35.7025 0 46 10.2975 46 23Z"
                fill="#D2D2D7" />
              <path fill-rule="evenodd" clip-rule="evenodd"
                d="M18.8519 19.7037C18.3814 19.7037 18 19.3223 18 18.8519C18 18.3814 18.3814 18 18.8519 18H27.3704C27.8408 18 28.2222 18.3814 28.2222 18.8519V27.3704C28.2222 27.8408 27.8408 28.2222 27.3704 28.2222C26.8999 28.2222 26.5185 27.8408 26.5185 27.3704V20.9084L19.4542 27.9727C19.1215 28.3054 18.5822 28.3054 18.2495 27.9727C17.9168 27.6401 17.9168 27.1007 18.2495 26.768L25.3138 19.7037H18.8519Z"
                fill="black" />
            </svg>
            <div class="flex flex-col">
              <span class="text-xs text-gray-500">Expense</span>
              <div class="flex items-center">
                <div class="font-mono mr-3">$21,500</div>
                <div class="flex">
                  <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"
                    class="mr-1">
                    <circle cx="7.5" cy="7.5" r="7.5" transform="rotate(-180 7.5 7.5)" fill="#565656" />
                    <path fill-rule="evenodd" clip-rule="evenodd"
                      d="M7.5 4C7.79288 4 8.03031 4.23743 8.03031 4.5303L8.0303 9.18943L10.0947 7.12502C10.3018 6.91792 10.6376 6.91792 10.8447 7.12502C11.0518 7.33212 11.0518 7.66789 10.8447 7.87498L7.87498 10.8447C7.66789 11.0518 7.33212 11.0518 7.12502 10.8447L4.15532 7.87498C3.94823 7.66788 3.94823 7.33212 4.15532 7.12502C4.36242 6.91792 4.69819 6.91792 4.90529 7.12502L6.9697 9.18943L6.9697 4.5303C6.9697 4.23743 7.20712 4 7.5 4Z"
                      fill="white" />
                  </svg>
                  <span class="text-xs"> -$34</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </CardHeader>
    <CardContent class="pt-4">
      <div>
        <Chart :month="month" :chartData="{
          income: chartData,
          expense: chartDataExpense,
        }" :tab="tabs"/>
      </div>
    </CardContent>
  </Card>
</template>

<style lang="scss" scoped>
.circle {
  display: table;
  width: 65px;
  height: 65px;

  i {
    display: table-cell;
    vertical-align: middle;
    text-align: center;
  }
}

.legend-icon {
  height: 5px;
  width: 5px;
  border-radius: 50%;
  display: inline-block;
}

.legend-icon--green {
  background: #A9CB01;
}
</style>
