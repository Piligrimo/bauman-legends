import Audio from './Audio.vue'
import Danger from './Danger.vue'
import Text from './Text.vue'
import Video from './Video.vue'
import Process from './Process.vue'
import Loading from './Loading.vue'
import Picture from './Picture.vue'
import Schema from './Schema.vue'
import {BASEURL} from '../../api/config'

const puzzle1 = {
  before: [
    {
      component: Danger,
      text: `Ошибка, ошибка, ошибка, КОД КРАСНЫЙ! Запуск системного протокола № 3242…`
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

const puzzle2 = {
  before: [
    {
      component: Loading,
      max: 88,
      text: 'Поиск решения...'
    },
    {
      component: Danger,
      text: `Ошибка! Отсутствует модуль расчета и анализа действий`
    },
    {
      component: Text,
      text: `Найдена ошибка. Экипаж, вам необходимо найти мой модуль вычислений и памяти`,
      character: 'stn-2'
    },
  ],
  after: [
    {
      component: Text,
      text: `О, так гораздо лучше. Приятно ощущать себя умным :)`,
      character: 'stn-2'
    },
    {
      component: Loading,
      max: 100,
      text: 'Поиск решения...'
    },
    {
      component: Text,
      text: `Исходя из проделанной мной работы, были определены наши цели.<br> Отчёт был выслан ниже`,
      character: 'stn-2'
    },
    {
      component: Picture,
      src: 'report.png'
    }
  ]
}

const puzzle3 = {
  before: [
    {
      component: Text,
      text: `Экипаж, я пока не могу покинуть свой пост … Маршрут сам себя не рассчитает …  Поэтому Вам придется находить путь самостоятельно, но не бойтесь корабль только с виду кажется большим.`,
      character: 'stn-2'
    },
  ],
  after: [
    {
      component: Text,
      text: `Экипаж, поздравляю! Вам удалось найти запись из архива, давайте её проявим.`,
      character: 'stn-2'
    },
    {
      component: Video,
      src: `${BASEURL}/file/конференция.mp4`
    },
    {
      component: Loading,
      max: 12,
      text: 'Восстановление памяти'
    },
    {
      component: Text,
      text: `Анализ системы показал, что начался процесс восстановления модуля воспоминаний`,
      character: 'stn-2'
    },
  ]
}

const puzzle4 = {
  before: [
    {
      component: Schema,
      variant: 1
    },
    {
      component: Text,
      text: `Так, что тут у нас… Ага… Топливный отсек требует планового осмотра… Хм… как долго этим никто не занимался…`,
      character: 'stn-2'
    },
    {
      component: Text,
      text: `Экипаж, мне требуется ваша помощь`,
      character: 'stn-2'
    },
  ],
  after: [
    {
      component: Text,
      text: `Какие Мы с вами молодцы! Осмотр проведен идеально. Так а это что такое… `,
      character: 'stn-2'
    },
    {
      component: Picture,
      src: '34.png'
    },
    {
      component: Loading,
      max: 25,
      text: 'Восстановление памяти'
    },
    {
      component: Text,
      text: `Ох, мои микросхемы немного коротят… Ох… `,
      character: 'stn-2'
    },
    {
      component: Text,
      text: `Зачем Стэнли. Зачем ты написал эту рецензию, не ты ли говорил, что наше устройство совершенно!?`,
      character: 'stanford'
    },
  ]
}

const puzzle5 = {
  before: [
    {
      component: Text,
      text: `Как же раскалываются мои биты … наверное много кэша накопилось, надо бы почистить …`,
      character: 'stn-2'
    },
    {
      component: Danger,
      text: `Осторожно! Возможен перегрев внутреннего процессора`
    },
    {
      component: Text,
      text: `Это уже игнорировать нельзя… Экипаж, для Вас будет важное поручение: Вам необходимо пройти в серверное помещение и выяснить, что могло вызвать поломку`,
      character: 'stn-2'
    },
    {
      component: Text,
      text: `Агх, Стэнфорд, а я говорил надо было увеличить буфер а ты нет, да нет…`,
      character: 'stanley'
    },
  ],
  after: [
    {
      component: Text,
      text: `Хм, мои расчеты были немного не достоверны. Похоже проблемы оказались серьезнее, чем я думал… Проблемы… Ошибка… Конец…`,
      character: 'stn-2'
    },
    {
      component: Audio, 
      src: 'experiment.wav'
    },
    {
      component: Loading,
      max: 38,
      text: 'Восстановление памяти'
    },
    {
      component: Text,
      text: `Проблема действительно серьезная, и дело не только в процессоре…`,
      character: 'stn-2'
    },
  ]
}


const puzzle6 = {
  before: [   
    {
      component: Process,
      text: 'Анализ оборудования'
    },
    {
      component: Text,
      text: `Процесс поиска проблемы был завершен с протоколом 0. Выполняю процесс перезагрузки…`,
      character: 'stn-2'
    },
    {
      component: Process,
      text: 'Перезагрузка систем корабля'
    },
    {
      component: Text,
      text: `Кхм, Кхм, Кхм…  Как замечательно снова проснуться. Не правда ли Стэнли… Стэнли… А забыли… `,
      character: 'stanford'
    },
    {
      component: Text,
      text: `О ребята, я понимаю, что для вас сейчас произошло что-то непонятное, но я потом все объясню…  точнее мы… не суть, не могли бы вы Нам помочь. От вас требуется перезапустить вручную пару генераторов `,
      character: 'stanford'
    },
  ],
  after: [
    {
      component: Text,
      text: `Фух, это было нелегко… Но наконец-то всё позади…`,
      character: 'stanford'
    },
    {
      component: Video,
      src: `${BASEURL}/file/дневник.mp4`
    },
    {
      component: Loading,
      max: 50,
      text: 'Восстановление памяти'
    },
    {
      component: Text,
      text: `Расслабляться у нас нет времени, ещё столько надо сделать.`,
      character: 'stanley'
    },
    {
      component: Text,
      text: `Явился не запылился. Ну, и что это было?`,
      character: 'stanford'
    },
    {
      component: Text,
      text: `Агх! Это то, про что я тебе говорил еще давно! Не надо было ставить генераторы слишком близко - невозможно проводить технический осмотр`,
      character: 'stanley'
    },
  ]
}


const puzzle7 = {
  before: [   
    {
      component: Text,
      text: `Ах да, мы чуть не забыли вам рассказать, что только что произошло…  кхм… Стэнли `,
      character: 'stanford'
    },
    {
      component: Text,
      text: `А? Что? Почему я? ... Ну ладно, так смотрите…`,
      character: 'stanley'
    },
    {
      component: Schema,
      variant: 2,
    },
    {
      component: Text,
      text: `Так вот, ваша текущая задача выяснить почему приходят эти сигналы`,
      character: 'stanley'
    },
    {
      component: Text,
      text: `А ты не забыл рассказать, что произошло?`,
      character: 'stanford'
    },
    {
      component: Text,
      text: `Сейчас важнее разобраться с сигналами… потом всё расскажу`,
      character: 'stanley'
    },
  ],
  after: [
    {
      component: Text,
      text: `Так, с одной задачей покончено. Какие мы молодцы!`,
      character: 'stanford'
    },
    {
      component: Text,
      text: `Так, с одной задачей покончено. Какие мы молодцы!`,
      character: 'stanford'
    },
    {
      component: Text,
      text: `Мы со Стенфордом - двойственное ИИ, у которого разделены …`,
      character: 'stanley'
    },
    {
      component: Audio, 
      src: 'diary.mp3'
    },
    {
      component: Loading,
      max: 63,
      text: 'Восстановление памяти'
    },
    {
      component: Text,
      text: `Стоп, стоп, стоп, что это было !?… Неужели мы были…`,
      character: 'stanford'
    },
    {
      component: Text,
      text: `Людьми, мда… хех, а я говорил, что надо модули было разнести, и видишь что случилось.`,
      character: 'stanley'
    },
    {
      component: Text,
      text: `Ну да, ты прав, но все же разрешилось хорошо… Надеюсь…`,
      character: 'stanford'
    },
  ]
}

const puzzle8 = {
  before: [   
    {
      component: Text,
      text: `Так, не время забываться!  Давайте вернемся к делу`,
      character: 'stanley'
    },
    {
      component: Text,
      text: `Да, ты прав`,
      character: 'stanford'
    },
    {
      component: Text,
      text: `Отлично! … Так … у нас остались еще важные задачи`,
      character: 'stanley'
    },
    {
      component: Picture,
      src: 'rpeort.png'
    },
    {
      component: Text,
      text: `Так будет лучше. Если кратко, то нам нужно…`,
      character: 'stanley'
    },
    {
      component: Text,
      text: `Понять, что случилось с модулем связи, ведь по неизвестной причине от него исходят странные помехи`,
      character: 'stanford'
    },
    {
      component: Text,
      text: `А да, вот так… Будьте осторожны, мы не знаем природы этого сигнала!`,
      character: 'stanley'
    },
  ],
  after: [
    {
      component: Text,
      text: `Да, это было не легко… Хорошо, что Мы выполнили всё по плану`,
      character: 'stanford'
    },
    {
      component: Text,
      text: `Согласен, задачка была не простая, но Мы смогли добиться успеха! 
      <br>Хахахах`,
      character: 'stanley'
    },
    {
      component: Text,
      text: `Ты чего?`,
      character: 'stanford'
    },
    {
      component: Text,
      text: `Да так… Данная ситуация напомнила мне наш первый полёт`,
      character: 'stanley'
    },
    {
      component: Audio,
      src: 'firstflight.mp3'
    },
    {
      component: Loading,
      max: 75,
      text: 'Восстановление памяти'
    },
    {
      component: Text,
      text: `Мда… было здорово`,
      character: 'stanford'
    },
    {
      component: Text,
      text: `Ага здорово… Пока я делал всю работу по кораблю ты все искал свою “особенную” обитаемую планету`,
      character: 'stanley'
    },
    {
      component: Text,
      text: `Это вообще-то не так уж и просто`,
      character: 'stanford'
    },
    {
      component: Text,
      text: `Да? А попросить помочь?`,
      character: 'stanley'
    },
    {
      component: Text,
      text: `Вообще-то мог и помочь, а потом вместе бы занялись расчетами пути<br>
        И… На Секундочку, я подходил к тебе, чтобы сообщить…  `,
      character: 'stanford'
    },
    {
      component: Text,
      text: `Ну и о чём же ты хотел мне сообщить!?`,
      character: 'stanley'
    },
    {
      component: Text,
      text: `Да о том, что наш дом может быть спасён! Спустя некоторое время после нашего отлёта мои расчеты показали, что потепление сходит на нет! Температура начала падать и на данный момент, между прочим, опустилась до 29°C! `,
      character: 'stanford'
    },
    {
      component: Text,
      text: `Нет, нет, нет …`,
      character: 'stanley'
    },
  ]
}

const puzzle9 = {
  before: [   
    {
      component: Text,
      text: `Во всяком случае, нам нужно двигаться к капитанскому мостику, там все и обговорим`,
      character: 'stanley'
    },
    {
      component: Text,
      text: `Да тут и говорить не о чем! А вдруг твой план не верен? `,
      character: 'stanford'
    },
    {
      component: Text,
      text: `Там и посмотрим, а сейчас Нам нужно выдвигаться.`,
      character: 'stanley'
    },
    {
      component: Picture, // заменить фото
      src: 'favicon.png'
    },
    {
      component: Text,
      text: `И первым делом нам надо пройти авторизацию?`,
      character: 'stanford'
    },
    {
      component: Text,
      text: `Да, всё верно`,
      character: 'stanley'
    },
  ],
  after: [
    {
      component: Text,
      text: `Ура, Мы почти у цели! Осталось всего лишь преодолеть систему безопасности`,
      character: 'stanford'
    },
    {
      component: Text,
      text: `Все как и рассчитано, надеюсь все и дальше пойдет по плану`,
      character: 'stanley'
    },
    {
      component: Text,
      text: `А ведь если бы не мое изобретение, где бы мы были?`,
      character: 'stanford'
    },
    {
      component: Text,
      text: `Хах, да, ты прав`,
      character: 'stanley'
    },
    {
      component: Loading,
      max: 88,
      text: 'Восстановление памяти'
    },
    {
      component: Text,
      text: `И что это было? Агх, похоже, биты информации начали немного искажаться`,
      character: 'stanley'
    },
    {
      component: Text,
      text: `Стэнли, что с тобой?`,
      character: 'stanford'
    },
    {
      component: Process,
      text: 'Загрузка аудио...'
    },
    {
      component: Audio,
      src: 'ai.mp3'
    },
    {
      component: Text,
      text: `Да, все хорошо, просто видимо был какой-то сбой… Хм… А ведь то, что мы слились в одно целое - это твоя недоработка`,
      character: 'stanley'
    },
    {
      component: Text,
      text: `Да что ты говоришь, мы же вместе придумали перенос сознания и работали над ним… Так что - это Наше упущение!`,
      character: 'stanford'
    },
    {
      component: Text,
      text: `Хах, ладно, шутки шутками, но Ты безусловно молодец! Придумать такую сложную систему - это просто Вау!`,
      character: 'stanley'
    },
    {
      component: Text,
      text: `Что это ты так резко начал меня хвалить? Это не очень-то в твоём стиле… Хехе..  Тем более мой один проект не сравнится с множеством твоих. Да даже если брать наши общие проекты. Я никогда не мог ничего путного сделать без Твоей подсказки…`,
      character: 'stanford'
    },
  ]
}

const puzzle10 = {
  before: [   
    {
      component: Text,
      text: `Знаешь, что ты и так был гениален, без моих подсказок`,
      character: 'stanley'
    },
    {
      component: Video,
      src: `${BASEURL}/file/119A3258.mpg`
    },
    {
      component: Text,
      text: `Помнишь, как мы вместе работали над первым общим проектом`,
      character: 'stanley'
    },
    {
      component: Text,
      text: `Да… хехе… Ты тогда два слова вместе не смог связать, хотя и придумал половину проекта…`,
      character: 'stanford'
    },
    {
      component: Text,
      text: `Я тогда тебе сильно завидовал, ведь представляешь, что это такое работать в научной сфере и не уметь даже рассказать про свои наработки… Да, если не ты ,то я даже не знаю, что со мной было… `,
      character: 'stanley'
    },
    {
      component: Text,
      text: `Нет! Ты бы стал величайшим учёным, потому что не надо было возится с бездарным мной…`,
      character: 'stanford'
    },
    {
      component: Text,
      text: `Да что несёшь!? Ты тогда смог воплотить мои наработки, придать им настоящее значение … И ты считаешь это малым трудом!? `,
      character: 'stanley'
    },
    {
      component: Text,
      text: `Знаешь, а может ты и прав! Когда мы вместе, мы - сила!`,
      character: 'stanford'
    },
    {
      component: Text,
      text: `Вот!  Узнаю своего старого доброго Стэна!`,
      character: 'stanley'
    },
    {
      component: Text,
      text: `Друзья навеки?`,
      character: 'stanford'
    },
    {
      component: Text,
      text: `Друзья навеки!`,
      character: 'stanley'
    },
    {
      component: Loading,
      max: 100,
      text: 'Восстановление памяти'
    },
    {
      component: Danger,
      text: `Запас топлива опустился ниже отметки в 65% `
    },
    {
      component: Text,
      text: `Стой, что это только что было!? `,
      character: 'stanford'
    },
    {
      component: Text,
      text: `Hет, Нет, Нет! Такого быть не может! Расчёты были верны…`,
      character: 'stanley'
    },
    {
      component: Text,
      text: `То есть … Только не говори, что …`,
      character: 'stanford'
    },
    {
      component: Text,
      text: `Топлива с трудом хватит до нашего пункта назначения…`,
      character: 'stanley'
    },
    {
      component: Text,
      text: `Но всё-таки хватит, так … У меня есть идея - на некоторых участках пути мы можем выключить пару двигателей - просто чуть дольше будем лететь.`,
      character: 'stanford'
    },
    {
      component: Text,
      text: `Ты конечно прав, но честно говоря по моим расчётам, это не внесет особую экономию, к тому же процесс починки некоторых частей корабля может повредить топливопровод!`,
      character: 'stanley'
    },
    {
      component: Text,
      text: `Ну тут я с тобой не соглашусь, если делать всё аккуратно, то и проблем не будет, тем более у нас - самый лучший экипаж.`,
      character: 'stanford'
    },
    {
      component: Text,
      text: `Стэнфорд, как ты не понимаешь!? Сама судьба говорит нам вернуться домой, топлива хватит даже без отключения двигателей и еще чуть-чуть останется… Да и дом есть дом …`,
      character: 'stanley'
    },
    {
      component: Text,
      text: `Знаешь что, Стэнли, Я НЕ ЖЕЛАЮ ЖЕРТВОВАТЬ ВСЕМИ ЛЮДЬМИ РАДИ ПРИЗРАЧНОЙ НАДЕЖДЫ. Тем более ты уже ошибся в расчётах с топливом, так что как мы можем тебе верить. Да и так не делается … Есть план, который Мы готовили очень долгое время и маршрут рассчитан по минимальному расходу топлива!`,
      character: 'stanford'
    },
    {
      component: Text,
      text: `Нет, это Ты жертвуешь людьми ради старой и не явной мечты! Да и с чего ТЫ взял, что маршрут верен? Мы до конца не можем знать наверняка…`,
      character: 'stanley'
    },
    {
      component: Text,
      text: `Ладно, в любом случае, мы еще должны получить доступ к капитанскому мостику…`,
      character: 'stanford'
    },
    {
      component: Text,
      text: `Согласен, сейчас главная задача - Капитанский Мостик. Давайте выдвигаться к нему. Там всё и решим…`,
      character: 'stanley'
    },
  ],
  after: [
    {
      component: Text,
      text: `Фух, задание выполнено…`,
      character: 'stanford'
    },
    {
      component: Text,
      text: `Да, это было не просто, но один вопрос так и остался не решенным`,
      character: 'stanley'
    },
    {
      component: Text,
      text: `Так Ты не передумал…`,
      character: 'stanford'
    },
    {
      component: Text,
      text: `Стэнфорд, я не могу видеть, как ты посылаешь нас в неизвестность, тем более если есть вариант вернуться домой.`,
      character: 'stanley'
    },
    {
      component: Text,
      text: `Хорошо, если мне не веришь, пусть решает большинство.`,
      character: 'stanford'
    },
    {
      component: Text,
      text: `Согласен. Экипаж, на ваши плечи ложится столь важный выбор. Мы понимаем, что Вам нужно время для совещания - по этой причине Мы будем ждать вас на Капитанском мостике`,
      character: 'stanley'
    },
    {
      component: Text,
      text: `И пусть Ваш выбор будет продуман...`,
      character: 'stanford'
    },
    {
      component: Text,
      text: `Экипаж, перед Вами стоит поистине самая сложная задача - выбор конечного пути. Помните, что топлива хватит только в один конец. Свой выбор Вы можете подтвердить на капитанском мостике. На нашем корабле он замаскирован под МЗДК. И помните, Вы определяете судьбу человечества. Делайте Выбор рационально. Удачи Вам!`,
      character: 'message'
    },
    
  ]
}

export default [
  puzzle1, puzzle2, puzzle3, puzzle4, puzzle5, puzzle6, puzzle7, puzzle8, puzzle9, puzzle10
]