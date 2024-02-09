<script setup lang="ts">
import {
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectItemIndicator,
  SelectPortal,
  SelectRoot,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectViewport,
  SelectItemText,
  SelectValue,
  SelectTrigger, TabsTrigger, type TabsTriggerProps
} from 'radix-vue'
import { Icon } from '@iconify/vue'
import { cn } from '@/lib/utils'
import { ref } from 'vue';
// import { inject } from 'vue'

const emit = defineEmits(['update:modelValue'])

const tabsTrigger = ref()
const props = defineProps<TabsTriggerProps & { class?: string }>()
const handleSelectClick = (val) => {
  tabsTrigger.value.$el.click()
}

const onSelectChange = (val) => {
  emit("update:modelValue", val)
}
</script>

<template>
  <TabsTrigger v-bind="props" ref="tabsTrigger" :class="cn(
    'inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium transition-all focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm',
    props.class,
  )
    ">
    <div class="inline cursor-pointer">Monthly<span class="mx-1 font-black">·</span></div>
    <SelectRoot class="w-100" @update:open="handleSelectClick" :default-value="1" @update:modelValue
="onSelectChange">
      <SelectTrigger class="flex items-center">
        <SelectValue />
        <Icon icon="iconamoon:arrow-down-2-bold" class="h-3.5 w-3.5" />
      </SelectTrigger>
      <SelectPortal>
        <SelectContent
          class="min-w-[160px] bg-white rounded shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[opacity,transform] data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade z-[100]"
          :side-offset="5" position="popper">
          <SelectScrollUpButton class="flex items-center justify-center h-[25px] bg-white text-violet11 cursor-default">
            <Icon icon="radix-icons:chevron-up" />
          </SelectScrollUpButton>

          <SelectViewport class="p-[5px]">
            <SelectGroup>
              <SelectItem v-for="(option, index) in ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']" :key="index"
                class="text-[13px] leading-none text-grass11 rounded-[3px] flex items-center h-[25px] pr-[35px] pl-[25px] relative select-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:outline-none data-[highlighted]:bg-green9 data-[highlighted]:text-green1"
                :value="index+1">
                <SelectItemIndicator class="absolute left-0 w-[25px] inline-flex items-center justify-center">
                  <Icon icon="radix-icons:check" />
                </SelectItemIndicator>
                <SelectItemText class="cursor-pointer">
                  {{ option }}
                </SelectItemText>
              </SelectItem>
            </SelectGroup>
          </SelectViewport>

          <SelectScrollDownButton class="flex items-center justify-center h-[25px] bg-white text-violet11 cursor-default">
            <Icon icon="radix-icons:chevron-down" />
          </SelectScrollDownButton>
        </SelectContent>
      </SelectPortal>
    </SelectRoot>
  </TabsTrigger>
</template>
