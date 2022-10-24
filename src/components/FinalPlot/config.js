import Audio from './Audio.vue'
import Danger from './Danger.vue'
import Text from './Text.vue'
import Video from './Video.vue'
import Process from './Process.vue'

const puzzle1 = {
  before: [
    {
      component: Danger,
    },
    {
      component: Audio,
      src: 'soundwakey.wav'
    }
  ],
  after: [
    {
      component: Text,
      text: `Экипаж, я вам безмерно благодарен! Почти все мои модули успешно восстановлены, но речевой протокол так и остался поврежденным… `,
      character: 'stn-2'
    },
    {
      component: Text,
      text: `К сожалению, его восстановление займет некоторое время. <br> Проанализировав ситуацию, я могу Вам рассказать, что произошло ранее…`,
      character: 'stn-2'
    },
    {
      component: Video,
      src: "https://cdn.theguardian.tv/webM/2015/07/20/150716YesMen_synd_768k_vp8.webm"
    },
    {
      component: Text,
      text: `Охранный протокол был выведен из строя на некоторое время. А если говорить человеческим языком -  кто-то вмешался в работу системы, но пока ситуация под контролем.`,
      character: 'stn-2'
    },
    {
      component: Process,
      text: 'Идет проверка всех модулей на целостность...'
    },
    {
      component: Text,
      text: `Все модули корабля исправны. Но при сканировании было найдено старое поврежденное сообщение `,
      character: 'stn-2'
    },
    {
      component: Text,
      text: `Эксперимент, в котором Вы принимали участие, пошёл не по плану. Вместо часа, Вы были заморожены на &#$ лет. Во время него $^&*#@$&(* %(#&$*(&*(&( $@#(*&$(*#@&*(, поэтому на Земле %^#$&*^%&*#$^. Вы были отправлены на %#^$*^*# с целью %#&(*&(*%&(*#&(*.  /`,
      character: 'message'
    },
    {
      component: Text,
      text: `К сожалению, из-за некоторых поврежденных модулей на данный момент я не могу расшифровать данное сообщение. И, что самое важное, Мы понятия не имеем куда летим … `,
      character: 'stn-2'
    },
  ]
}

export default [
  puzzle1
]