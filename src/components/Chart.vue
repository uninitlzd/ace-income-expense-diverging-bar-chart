<script setup lang="ts">
import { VisXYContainer, VisStackedBar, VisAxis, VisTooltip } from '@unovis/vue'
import { DataRecord, DisplayType } from './data.ts'
import { Position, Sizing, StackedBar } from '@unovis/ts';
import { computed, ref, watch } from 'vue';

const tickFormatY = (tick: number) => {
  return (tick == 0) ? '' : `$ ${tick}k`
}

const tickFormatX = (tick: number): string => {
  if (props.tab == DisplayType.Monthly)
    return String(tick)

  if (props.tab == DisplayType.Anually) {
    const year = 2022
    return tick % 1 == 0 ? (String(year + tick)) : ''
  }

  let label = {
    1: 'Q1 Jan - Mar',
    2: 'Q2 Apr - Jun',
    3: 'Q3 Jul - Sep',
    4: 'Q4 Oct - Dec',
  }[tick]
  return label || ''
}

const tickTextWidthX = computed(() => {
  return 80
})

const getMonthName = (monthNumber: number) => {
  const date = new Date();
  date.setMonth(monthNumber - 1);

  return date.toLocaleString('en-US', { month: 'short' });
}

const triggers = {
  [StackedBar.selectors.bar]: (d: DataRecord) => {
    const monthText = getMonthName(props.month)
    const typeText = d.type === 'income' ? 'Income' : 'Expense'
    const lineAccentColor = d.type === 'income' ? 'bg-greenAccent' : 'bg-grayAccent'
    return `
      <div class="flex items-center -p-10">
        <div class="h-[25px] w-[5px] ${lineAccentColor}"></div>
        <div class="p-6 py-3">
            <div class="flex items-center">
              <div class="flex flex-col">
                <span class="text-xs text-gray-500 mb-">${typeText} · ${d.x} ${monthText} 2024</span>
                <div class="flex items-center">
                  <div class="mr-3 font-mono">${d.yValueFormatted}</div>
                  <div class="flex">
                    ${d.type == 'income' ? `<svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" class="mr-1">
                      <circle cx="7.5" cy="7.5" r="7.5" fill="#427A50" />
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M7.5 11C7.20712 11 6.9697 10.7626 6.9697 10.4697L6.9697 5.81057L4.90528 7.87498C4.69819 8.08208 4.36242 8.08208 4.15532 7.87498C3.94823 7.66788 3.94823 7.33211 4.15532 7.12502L7.12502 4.15532C7.33212 3.94823 7.66788 3.94823 7.87498 4.15532L10.8447 7.12502C11.0518 7.33212 11.0518 7.66788 10.8447 7.87498C10.6376 8.08208 10.3018 8.08208 10.0947 7.87498L8.0303 5.81057L8.0303 10.4697C8.0303 10.7626 7.79288 11 7.5 11Z" fill="white" />
                    </svg>` : `<svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"
                    class="mr-1">
                    <circle cx="7.5" cy="7.5" r="7.5" transform="rotate(-180 7.5 7.5)" fill="#565656" />
                    <path fill-rule="evenodd" clip-rule="evenodd"
                      d="M7.5 4C7.79288 4 8.03031 4.23743 8.03031 4.5303L8.0303 9.18943L10.0947 7.12502C10.3018 6.91792 10.6376 6.91792 10.8447 7.12502C11.0518 7.33212 11.0518 7.66789 10.8447 7.87498L7.87498 10.8447C7.66789 11.0518 7.33212 11.0518 7.12502 10.8447L4.15532 7.87498C3.94823 7.66788 3.94823 7.33212 4.15532 7.12502C4.36242 6.91792 4.69819 6.91792 4.90529 7.12502L6.9697 9.18943L6.9697 4.5303C6.9697 4.23743 7.20712 4 7.5 4Z"
                      fill="white" />
                  </svg>`}
                    
                    <span class="text-xs">${d.type == 'income' ? '+' : '-'}$328</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
      </div>
  `
  }
}

const events = {
  [StackedBar.selectors.barGroup]: {
    mouseover: (_: any, e: MouseEvent) => {
      const barWrapper = (e.target as HTMLElement).parentElement?.parentElement
      const targetElement: HTMLElement | null = (e.target as HTMLElement)?.parentElement
      barWrapper?.classList.add("stackedbar--hovered")
      targetElement?.classList.add("hovered")
    },
    mouseout: (_: any, e: MouseEvent) => {
      const barWrapper = (e.target as HTMLElement).parentElement?.parentElement
      const targetElement: HTMLElement | null = (e.target as HTMLElement)?.parentElement
      barWrapper?.classList.remove("stackedbar--hovered")
      targetElement?.classList.remove("hovered")
    }
  },
}

const attributes = {
  [StackedBar.selectors.barGroup]: {
    "class": (d: DataRecord) => `bargroup bargroup-${d.x}`
  },
}

type ChartDataProps = {
  income: DataRecord[],
  expense: DataRecord[]
}

const props = defineProps<{
  month: number,
  chartData: ChartDataProps,
  tab: DisplayType
}>()

const xAxisNumTicks = computed(() => {
  if (props.tab == DisplayType.Quarter) {
    return 4
  }

  if (props.tab == DisplayType.Anually) {
    return 3
  }
  return props.chartData.income.length
})

const chartKey = ref(1)

watch(props, () => {
  chartKey.value++
})

</script>

<template>
  <div id="chart" :class="`chart-type-${props.tab.toLowerCase()}`">
    <VisXYContainer :height="200" :data="chartData.income" :sizing="Sizing.Extend" :yDomain="[0, 10]">
      <VisStackedBar :key="chartKey" :barPadding="0.2" :x="(d: DataRecord) => d.x" :y="(d: DataRecord) => d.y"
        color="#A9CB01" :events="events" :attributes="attributes" ref="incomeBar" :duration="800" />
      <VisAxis type="y" :tickFormat="tickFormatY" :gridLine="false" :domainLine="false" :tickLine="false"
        :tickValues="[0, 2.5, 5, 7.5, 10]" tickTextFontSize="14px" />
      <VisTooltip :triggers="triggers" :vertical-placement="Position.Center"
        :attributes="{ type: 'tooltip-container' }" />
    </VisXYContainer>
    <div class="flex items-center h-2">
      <div class="w-[56px]">
        <span style="color: var(--vis-axis-tick-label-color); font-size: 14px; padding-left: 13px;">$ 0</span>
      </div>
      <div class="separator bg-gray-200 w-full h-[2px]"></div>
    </div>
    <VisXYContainer :height="220" yDirection="south" :data="chartData.expense" :yDomain="[0, 10]">
      <VisStackedBar :key="chartKey" :barPadding="0.2" :x="(d: DataRecord) => d.x" :y="(d: DataRecord) => d.y2"
        color="#D2D2D7" :events="events" :attributes="attributes" :duration="800" />
      <VisAxis type="x" :tickFormat="tickFormatX" :tickTextWidth="tickTextWidthX" :numTicks="xAxisNumTicks" :gridLine="false" :domainLine="false" :tickLine="false" />
      <VisAxis type="y" :tickFormat="tickFormatY" :gridLine="false" :domainLine="false" :tickLine="false"
        :tickValues="[0, 2, 5, 7.5, 10]" tickTextFontSize="14px" />
      <VisTooltip :triggers="triggers" :vertical-placement="Position.Center" />
    </VisXYContainer>
  </div>
</template>

<style scoped>
:deep(svg) {
  overflow: visible;
}


:deep(svg .stackedbar--hovered .bargroup path) {
  /* fill: red !important; */
  opacity: 1;
  transition: opacity 600ms ease !important;
}

:deep(svg .stackedbar--hovered .bargroup:not(.hovered) path) {
  /* fill: red !important; */
  opacity: 0.3;
  transition: opacity 600ms ease !important;
}

.tooltip-container {
  padding: 0px !important;
}
</style>

<style>
#chart {
  --vis-tooltip-padding: 0px 0px !important;
}
</style>