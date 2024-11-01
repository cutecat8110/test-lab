<script setup>
import { useTextareaAutosize } from '@vueuse/core'
import { ref } from 'vue'
import { Icon } from '@iconify/vue'

/* 彈窗 */
const isModalShow = ref(false)
const toggleModal = event => {
  if (event === 'show') {
    preview.value = [null, null, null]
    isModalShow.value = true
  } else if (event === 'close') {
    isModalShow.value = false
  }
}

/* 表單資料 */
const preview = ref([null, null, null])
const { textarea, input } = useTextareaAutosize()

/* 圖片 */
const handleFileUpload = (index, event) => {
  const file = event.target.files[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = e => {
      console.log(index)
      preview.value[index] = e.target.result
    }
    reader.readAsDataURL(file)
  }
}
// 刪除圖片資料
const fileDelete = index => {
  preview.value[index] = null
}
// 圖片預覽
const visibleRef = ref(false)
const indexRef = ref(0)
const imgsRef = ref([])
const onShow = () => {
  visibleRef.value = true
}
const showSingle = view => {
  imgsRef.value = view
  onShow()
}
const onHide = () => (visibleRef.value = false)
</script>

<template>
  <main>
    <Teleport to="body">
      <transition name="modal">
        <div
          v-if="isModalShow"
          class="fixed inset-0 z-[60] overflow-y-auto bg-black/40"
        >
          <div class="flex items-center justify-center p-3 min-h-full">
            <div
              class="bg-white sm:max-w-[54rem] container px-0 overflow-hidden shadow-2xl"
            >
              <!-- header -->
              <div class="flex items-center justify-between p-4">
                <h2 class="text-xl">意見反饋</h2>

                <!-- 彈窗關閉按鈕 -->
                <button
                  class="flex h-6 w-6 items-center justify-center transition-colors text-gray-500 text-xl"
                  type="button"
                  @click="toggleModal('close')"
                >
                  <Icon icon="mdi:window-close" />
                </button>
              </div>

              <!-- body -->
              <div class="py-3 px-10 space-y-5 pb-20">
                <div class="space-y-2">
                  <label for="category" class="space-x-1">
                    <span class="text-red-500">*</span>
                    <span> 類別 </span>
                  </label>
                  <select
                    type="text"
                    id="category"
                    name="category"
                    class="border p-2 block w-full"
                    placeholder="請選擇類別"
                  >
                    <option value="">請選擇類別</option>
                    <option value="0">操作問題</option>
                    <option value="1">優化建議</option>
                    <option value="2">Bug 修復</option>
                    <option value="3">其他</option>
                  </select>
                </div>

                <div class="space-y-2">
                  <label for="title" class="space-x-1">
                    <span class="text-red-500">*</span>
                    <span> 標題 </span>
                    <span class="text-gray-400"> 限30字符內 </span>
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    class="border p-2 block w-full"
                    maxlength="30"
                    placeholder="請輸入標題"
                  />
                </div>

                <div class="space-y-2">
                  <label for="description" class="space-x-1">
                    <span class="text-red-500">*</span>
                    <span> 描述 </span>
                    <span class="text-gray-400"> 限300字符內 </span>
                  </label>
                  <textarea
                    ref="textarea"
                    id="description"
                    name="description"
                    v-model="input"
                    class="border p-2 w-full block resize-none"
                    placeholder="請描述您的意見/問題"
                    rows="3"
                    maxlength="300"
                  />
                </div>

                <div class="space-y-2">
                  <label for="description" class="space-x-1">
                    <span> 參考圖片 </span>
                    <span class="text-gray-400">
                      (僅支援PNG、JPG格式，每張5MB內)
                    </span>
                  </label>

                  <div class="flex gap-4">
                    <div v-for="(view, index) in preview" :key="index">
                      <div
                        v-if="view"
                        class="relative border-solid group img-wrapper"
                      >
                        <div
                          class="absolute top-0 left-0 opacity-0 w-full h-full bg-black/40 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2"
                        >
                          <Icon
                            @click="showSingle(view)"
                            icon="ic:baseline-zoom-in"
                            class="text-white text-2xl"
                          />
                          <Icon
                            icon="mdi:delete"
                            class="text-white text-2xl"
                            @click="fileDelete(index)"
                          />
                        </div>
                        <img
                          :src="view"
                          alt="Uploaded Image Preview"
                          class="w-full h-full object-cover"
                        />
                      </div>

                      <label
                        v-else
                        :for="`upload-${index}`"
                        class="border-dashed img-wrapper"
                      >
                        <Icon icon="mdi:plus" class="text-gray-500 text-4xl" />
                      </label>

                      <input
                        type="file"
                        :id="`upload-${index}`"
                        @change="event => handleFileUpload(index, event)"
                        accept="image/*"
                        class="hidden"
                      />
                    </div>

                    <vue-easy-lightbox
                      :visible="visibleRef"
                      :imgs="imgsRef"
                      :index="indexRef"
                      @hide="onHide"
                    ></vue-easy-lightbox>
                  </div>

                  <div class="text-gray-400">
                    可提供意見/問題截圖(上傳數量
                    <span class="text-green-400">
                      {{ preview.filter(element => element !== null).length }}
                    </span>
                    /3)
                  </div>
                </div>

                <button
                  type="button"
                  class="block w-full text-white bg-[#4182EB] p-3"
                >
                  提交
                </button>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </Teleport>

    <div class="fixed bottom-0 left-0 w-full border-t p-10 text-center">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum, impedit.

      <Icon
        @click="toggleModal('show')"
        icon="mdi:alert-circle"
        class="absolute right-3 bottom-3 text-[#005AAA] text-3xl cursor-pointer"
      />
    </div>
  </main>
</template>

<style lang="scss" scoped>
.img-wrapper {
  @apply flex items-center justify-center w-32 h-32 rounded-lg border-2 overflow-hidden cursor-pointer;
}
textarea {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

textarea::-webkit-scrollbar {
  display: none;
}
.modal-enter-active {
  transition:
    opacity 0.225s ease-in,
    filter 0.225s ease-in;
}
.modal-leave-active {
  transition:
    opacity 0.225s ease-out,
    filter 0.225s ease-out;
}
.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
</style>
