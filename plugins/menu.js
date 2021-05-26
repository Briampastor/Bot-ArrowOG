let fs = require ('fs')
let path = require('path')
let levelling = require('../lib/levelling')
{

      await RendyGanteng.fakeReply(m.chat, 'Loading...', '0@s.whatsapp.net', '*WHATSAPP VERIFICADO*')

}
let handler  = async (m, { conn, usedPrefix: _p }) => {
  try {
    let package = JSON.parse(fs.readFileSync(path.join(__dirname, '../package.json')))
    let { exp, limit, level } = global.DATABASE.data.users[m.sender]
    let { min, xp, max } = levelling.xpRange(level, global.multiplier)
    let name = conn.getName(m.sender)
    let d = new Date
    let locale = 'id'
    let weton = ['Pahing', 'Pon', 'Wage', 'Kliwon', 'Legi'][Math.floor(((d * 1) + d.getTimezoneOffset()) / 84600000) % 5]
    let week = d.toLocaleDateString(locale, { weekday: 'long' })
    let date = d.toLocaleDateString(locale, {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
    let dateIslamic = Intl.DateTimeFormat(locale + '-TN-u-ca-islamic', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(d)
    let time = d.toLocaleTimeString(locale, {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric'
    })
    let _uptime = process.uptime() * 1000
    let _muptime
    if (process.send) {
      process.send('uptime')
      _muptime = await new Promise(resolve => {
        process.once('message', resolve)
        setTimeout(resolve, 1000)
      }) * 1000
    }
    let muptime = clockString(_muptime)
    let uptime = clockString(_uptime)
    let totalreg = Object.keys(global.DATABASE._data.users).length
    let rtotalreg = Object.values(global.DATABASE._data.users).filter(user => user.registered == true).length
    let tags = {
      'main': 'Menu',
      'game': 'Juegos',
      'xp': 'Exp & Limit',
      'sticker': 'Sticker',
      'kerang': 'Kerang Ajaib',
      'quotes': 'Quotes',
      'admin': 'Admin',
      'group': 'Grupo',
      'premium': 'Premium',
      'internet': 'Internet',
      'nulis': 'MagerNulis & Logo',
      'downloader': 'Descargador',
      'tools': 'Herramientas',
      'fun': 'Fun',
      'database': 'Base de datos',
      'jadibot': 'Jadi Bot',
      'owner': 'Owner',
      'host': 'Anfitrión',
      'advanced': 'Avanzado',
      'info': 'Info',
      '': 'Ninguna Categoria',
    }
    for (let plugin of Object.values(global.plugins))
      if (plugin && 'tags' in plugin)
        for (let tag of plugin.tags)
          if (!tag in  tags) tags[tag] = tag
    let help = Object.values(global.plugins).map(plugin => {
      return {
        help: plugin.help,
        tags: plugin.tags,
        prefix: 'customPrefix' in plugin,
        limit: plugin.limit
      }
    })
    let groups = {}
    for (let tag in tags) {
      groups[tag] = []
      for (let menu of help)
        if (menu.tags && menu.tags.includes(tag))
          if (menu.help) groups[tag].push(menu)
    }
        {
      conn.sendFile(m.chat, 'Vos del bot.m4a', '', 'xd', m)
}
    conn.menu = conn.menu ? conn.menu : {}
    let before = conn.menu.before || `
╭─「 ${conn.user.name} 」
│ Hola👋, %name!
│
│ ✨Restante de limites✨ *%limit Limit*
│ 🎚️Nivel Y experiencia🎚️ *%level (%exp / %maxexp)*
│ %totalexp XP en Total
│ 
│ Fecha📅: *%week %weton, %date*
│ 
│ Hora⌚: *%time*
│
│ ⌛Tiempo de actividad⌛: *%uptime (%muptime)*
│ 🗃️Base de datos🗃️: %rtotalreg of %totalreg
│ 
│📲Sistema operativo : *${conn.user.phone.device_manufacturer}*
│✅version : *${conn.browserDescription[2]}*
│
│
│🔥𝐌𝐲 𝐜𝐚𝐧𝐚𝐥 𝐝𝐞 𝐲𝐨𝐮𝐭𝐮𝐛𝐞🔥
│https://m.youtube.com/channel/UCYHmLosvfftHMmLrlGDwIPg
│
│%readmore
│ *💢𝗢𝗯𝗲𝗱𝗲𝗰𝗲 𝗹𝗮𝘀 𝗿𝗲𝗴𝗹𝗮𝘀 💢*
│  *❌ Prohibido llamar o escribir al bot📲*
│  *❌Prohibido spam al bot☢*
│. *❌No agregar al bot a otros grupos♻*
│  *✅𝑺𝒖𝒔𝒄𝒓𝒊́𝒃𝒆𝒕𝒆 𝒂 𝒎𝒊 𝒄𝒂𝒏𝒂𝒍*
│%readmore
│creditos ✔️ *Arrow_OG*
╰────
%readmore`
    let header = conn.menu.header || '╭─「 %category 」'
    let body   = conn.menu.body   || '│ • %cmd%islimit'
    let footer = conn.menu.footer || '╰────\n'
    let after  = conn.menu.after  || (conn.user.jid == global.conn.user.jid ? '' : `Powered by https://wa.me/${global.conn.user.jid.split`@`[0]}`) + `\n*%npmname@^%version*\n\`\`\`\%npmdesc\`\`\``
    let _text  = before + '\n'
    for (let tag in groups) {
      _text += header.replace(/%category/g, tags[tag]) + '\n'
      for (let menu of groups[tag]) {
        for (let help of menu.help)
          _text += body.replace(/%cmd/g, menu.prefix ? help : '%p' + help).replace(/%islimit/g, menu.limit ? ' (Limit)' : '')  + '\n'
      }
      _text += footer + '\n'
    }
    _text += after
    text =  typeof conn.menu == 'string' ? conn.menu : typeof conn.menu == 'object' ? _text : ''
    let replace = {
      '%': '%',
      p: _p, uptime, muptime,
      npmname: package.name,
      npmdesc: package.description,
      version: package.version,
      exp: exp - min,
      maxexp: xp,
      totalexp: exp,
      xp4levelup: max - exp,
      github: package.homepage ? package.homepage.url || package.homepage : '[unknown github url]',
      level, limit, name, weton, week, date, dateIslamic, time, totalreg, rtotalreg,
      readmore: readMore
    }
    text = text.replace(new RegExp(`%(${Object.keys(replace).join`|`})`, 'g'), (_, name) => replace[name])
    conn.sendFile(m.chat, 'Bot-Arrow10.png', '', text.trim(), m)
  } catch (e) {
    conn.reply(m.chat, 'Maaf, menu sedang error', m)
    throw e
  }
}
handler.help = ['menu','help','?']
handler.tags = ['main']
handler.command = /^(menu|help|\?)$/i
handler.owner = false
handler.mods = false
handler.premium = false
handler.group = false
handler.private = false

handler.admin = false
handler.botAdmin = false

handler.fail = null
handler.exp = 3
handler.register = true

module.exports = handler

const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)

function clockString(ms) {
  let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
  let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
  let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
  return [h, m, s].map(v => v.toString().padStart(2, 0) ).join(':')
}
