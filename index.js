const MPP = require('anon64-mpp');

const Discord = require('discord.js');

const translate = require('translate');

const Client = require('./AMPP.js/Client.js');

const os = require('os');

translate.engine = 'yandex';

const botname = 'AnonBot6.4';

const do_not_follow = [];

//var process = require("./secret.json")

translate.key = process.env.YANDEX_TOKEN;

const bot = new Discord.Client();

const lang = 'en';

const start = Math.round(Date.now() / 1000);

MPP.client.setChannel('lobby');
let chat_buffer = [];

let cd_chat_buffer = [];

let d_chat_buffer = [];

const chatInt1 = setInterval(() => {
	const msg = chat_buffer.shift();
	if (msg)
		translate(msg, lang).then(oof => {
			MPP.chat.send(oof);
		});
}, 2050);

/*
function rcheck() {
}
*/
function similar(first, second, percent) {
	if (
		first === null ||
		second === null ||
		typeof first === 'undefined' ||
		typeof second === 'undefined'
	) {
		return 0;
	}

	first += '';
	second += '';

	let pos1 = 0;
	let pos2 = 0;
	let max = 0;
	const firstLength = first.length;
	const secondLength = second.length;
	let p;
	let q;
	let l;
	let sum;

	max = 0;

	for (p = 0; p < firstLength; p++) {
		for (q = 0; q < secondLength; q++) {
			for (
				l = 0;
				p + l < firstLength &&
				q + l < secondLength &&
				first.charAt(p + l) === second.charAt(q + l);
				l++
			);
			if (l > max) {
				max = l;
				pos1 = p;
				pos2 = q;
			}
		}
	}

	sum = max;

	if (sum) {
		if (pos1 && pos2) {
			sum += similar(first.substr(0, pos1), second.substr(0, pos2));
		}

		if (pos1 + max < firstLength && pos2 + max < secondLength) {
			sum += similar(
				first.substr(pos1 + max, firstLength - pos1 - max),
				second.substr(pos2 + max, secondLength - pos2 - max)
			);
		}
	}

	if (!percent) {
		return sum;
	} else {
		return sum * 200 / (firstLength + secondLength);
	}
}

function getUser(target) {
	if (target === '') {
		return true;
	}
	for (const pl in MPP.client.ppl) {
		if (!MPP.client.ppl.hasOwnProperty(pl)) continue;
		const part = MPP.client.ppl[pl];
		if (
			part.name.toLowerCase().includes(target) ||
			similar(part.name.toLowerCase(), target, 1) >= 60
		) {
			return part;
		}
	}
}
const mass = 100;
const gravity = 5;
const friction = 4;
const pos = { x: 50, y: 50 };
const pos2 = { x: 50, y: 50 };
const acc = { x: 0, y: 0 };
const vel = { x: 0, y: 0 };
const follower = '7504f8a8bb9e7c39ddbcbd27';
const followPos = { x: 50, y: 50 };
MPP.client.on('m', msg => {
	part = MPP.client.findParticipantById(msg.id);
	if (part._id == MPP.client.user._id) return;
	if (do_not_follow.includes(part._id)) return;
	followPos.x = +msg.x;
	followPos.y = +msg.y;
});
const updateInt = setInterval(() => {
	pos2.x = followPos.x;
	pos2.y = followPos.y;
	acc.x = (pos2.x - pos.x - friction * vel.x) / mass;
	acc.y = (pos2.y - pos.y - friction * vel.y + gravity) / mass;
	vel.x += acc.x;
	vel.y += acc.y;
	pos.x += vel.x;
	pos.y += vel.y;
	if (pos.x >= 100) pos.x = 100;
	if (pos.x <= 0) pos.x = 0;
	if (pos.y >= 100) pos.y = 100;
	if (pos.y <= 0) pos.y = 0;
	MPP.client.sendArray([
		{
			m: 'm',
			x: (MPP.client.getOwnParticipant().x = pos.x),
			y: (MPP.client.getOwnParticipant().y = pos.y),
		},
	]);
}, 15);

function randNum(min, max) {
	return Math.round(Math.random() * (max - min) + min);
}
Array.prototype.random = function(q) {
	if (q === undefined) {
		return this.length > 0
			? this[Math.floor(this.length * Math.random())]
			: undefined;
	} else {
		let amount = q >>> 0;
		let result = this.slice(0, amount);
		for (let i = amount; i < this.length; i++) {
			let j = Math.floor(Math.random() * i);
			if (j < amount) {
				result[j] = this[i];
			}
		}
		return result;
	}
};
people = {};
function check(id) {
	let temp = false;
	Object.keys(people).forEach(user => {
		if (user == id) temp = true;
	});
	return temp;
}
tried = false;
a = false;
timeout = 0;
math = () => {
	startingT = Date.now() / 1000;
	tried = true;
	a = false;
	maths = '/*-+'.split('');
	rand = randNum(0, 100);
	rand2 = randNum(0, 100);
	mathe = maths.random();
	pts = randNum(15, 130);
	var rep = `Math: what is ${rand} ${mathe} ${rand2}? >${pts} pts<`;
	if (mathe == '*' || mathe == '/') {
		rand = randNum(0, 30);
		rand2 = randNum(1, 31);
		ans = eval(rand + mathe + rand2);
		var rep = `Math: what is ${rand} ${mathe} ${rand2}? >${pts} pts<`;
		if (mathe == '/') {
			if (ans % 1 != 0) {
				sendChat(
					`Math: what is ${rand} ${mathe} ${rand2}? (round to nearest hundredth) >${pts} pts<`
				);
				ans = ans.toFixed(2);
			} else {
				sendChat(rep);
			}
		} else {
			sendChat(rep);
		}
	} else {
		sendChat(rep);
		ans = eval(rand + mathe + rand2);
	}
	timeout = setTimeout(() => {
		if (!a) {
			MPP.chat.send(`Times up! Answer was ${ans}`);
			tried = false;
		}
	}, 22000);
};
MPP.client.on('a', m => {
	if (a) return;
	if (!tried) return;
	let inp = m.a;
	if (m.a.startsWith('.')) inp = `0${inp}`;
	if (ans % 1 != 0 && ans.endsWith('0')) {
		ans = ans.substring(0, ans.length - 1);
	}
	if (inp % 1 != 0 && inp.endsWith('0')) {
		inp = m.a.substring(0, m.a.length - 1);
	}
	if (inp == ans) {
		if (!check(m.p._id)) {
			people[m.p._id] = { pts: 0 };
		}
		clearTimeout(timeout);
		MPP.chat.send(
			`Math: correct! (that took you ${(Date.now() / 1000 - startingT).toFixed(
				3
			)} seconds)`
		);
		a = true;
		tried = false;
		people[m.p._id].pts += pts;
		ans = '';
	}
});
function sendChat(msg) {
	if (lang == 'en') {
		msg.match(/.{1,508}/g).forEach((x, i) => {
			if (x === '') return;
			if (i !== 0) x = x;
			chat_buffer.push(x);
		});
	} else {
		translate(msg, lang).then(oof => {
			oof.match(/.{1,508}/g).forEach((x, i) => {
				if (x === '') return;
				if (i !== 0) x = x;
				chat_buffer.push(x);
			});
		});
	}
}
function sectoform(sec) {
	let totalSeconds = sec;
	let years = Math.floor(totalSeconds / 31556926);
	totalSeconds %= 31556926;
	let months = Math.floor(totalSeconds / Math.round(2629743.83));
	totalSeconds %= Math.round(2629743.83);
	let days = Math.floor(totalSeconds / 86400);
	totalSeconds %= 86400;
	let hours = Math.floor(totalSeconds / 3600);
	totalSeconds %= 3600;
	let minutes = Math.floor(totalSeconds / 60);
	let seconds = totalSeconds % 60;
	//console.log(years, months, days, hours, minutes, seconds);
	if (parseInt(years) <= 9) years = `0${years}`;
	if (parseInt(months) <= 9) months = `0${months}`;
	if (parseInt(days) <= 9) days = `0${days}`;
	if (parseInt(hours) <= 9) hours = `0${hours}`;
	if (parseInt(minutes) <= 9) minutes = `0${minutes}`;
	if (parseInt(seconds) <= 9) seconds = `0${seconds}`;

	years = `${years}:`;
	months = `${months}:`;
	days = `${days}:`;
	hours = `${hours}:`;
	minutes = `${minutes}:`;

	if (years == '00:' && months == '00:') years = '';
	if (months == '00:' && days == '00:') months = '';
	if (days == '00:' && hours == '00:') days = '';
	if (hours == '00:' && minutes == '00:') hours = '';

	return years + months + days + hours + minutes + seconds;
}
function dChat(id, msg) {
	if (lang == 'en') {
		bot.channels.get(id).sendMessage(msg);
	} else {
		translate(msg, lang).then(oof => {
			bot.channels.get(id).sendMessage(msg);
		});
	}
}

function name(name) {
	MPP.client.sendArray([
		{
			m: 'userset',
			set: {
				name,
			},
		},
	]);
}
const op = [
	'6CC6A3910D86F9739F57',
	'd55bf273f64f37c5691f3bbb',
	'63ce4e6b86780ae23e04a5b8',
	'9f9caf0d1638e0064b670d8e',
];
const cmdChar = '/';
const jserr = 'Inaccessible';
MPP.client.on('a', msg => {
	let isAdmin = false;
	let args = msg.a.split(' ');
	let cmd = args[0];
	let input = msg.a.slice(cmd.length).trim();
	const commands = ['help', 'test', 'pts', 'math'];
	const opcmds = ['js'];
	if (op.includes(msg.p._id)) isAdmin = true;
	if (cmd == `${cmdChar}help` || cmd == `${cmdChar}h`) {
		let cmds2 = cmdChar + commands[0];
		let adminstring2 = cmdChar + opcmds[0];
		for (d = 1; d < commands.length; d++) {
			cmds2 += `, ${cmdChar}${commands[d]}`;
		}
		for (d = 1; d < opcmds.length; d++) {
			adminstring2 += `, ${cmdChar}${opcmds[d]}`;
		}
		if (isAdmin) {
			//help commands
			sendChat(`Main Commands: ${cmds2}`);
			sendChat(`Operator Commands: ${adminstring2}`);
		} else {
			sendChat(`Main Commands: ${cmds2}`);
		}
	} else if (cmd == `${cmdChar}js`) {
		if (isAdmin) {
			try {
				if (eval(`typeof ${input}`) == 'function') {
					sendChat(jserr);
				} else {
					throw new Error('not function!');
				}
			} catch (e) {
				try {
					sendChat(`Console: ${eval(input)}`);
				} catch (err) {
					sendChat(`${err}`);
				}
			}
		}
	} else if (cmd == `${cmdChar}test`) {
		sendChat('TEST!!');
	} else if (cmd == `${cmdChar}oof` && isAdmin) {
		sendChat(`Debugs: ${op}`);
	} else if (cmd == `${cmdChar}translate`) {
		const def1 = args[args.length - 1] ? args[args.length - 1] : 'en';
		sendChat(input.substring(0, input.length - args[args.length - 1]), def1);
	} else if (cmd == `${cmdChar}pts`) {
		if (!check(msg.p._id)) {
			sendChat(`You are not in the database, ${msg.p.name}`);
			return;
		}
		const pt = people[msg.p._id].pts == 1 ? 'point' : 'points';
		sendChat(`You, ${msg.p.name}, have ${people[msg.p._id].pts} ${pt}`);
	} else if (cmd == `${cmdChar}math`) {
		if (tried) return;
		math();
	} else if (cmd == `${cmdChar}dnf`) {
		try {
			if (!isAdmin) {
				sendChat(
					`Prevents bot from following players. You are not admin (${wot.p
						.name})`
				);
				return;
			}
			if (!input) {
				sendChat(`Prevents bot from following players.`);
				return;
			}
			const user = getUser(input);
			if (user === true || user === undefined) {
				sendChat(`User not found.`);
				return;
			}
			if (do_not_follow.includes(user._id)) {
				sendChat(`Bot can now follow: ${user._id} (${user.name})`);
				const index = do_not_follow.indexOf(user._id);
				if (index > -1) {
					do_not_follow.splice(index, 1);
				}
			} else {
				sendChat(`Bot will no longer follow: ${user._id} (${user.name})`);
				do_not_follow.push(user._id);
			}
		} catch (e) {
			return;
		}
	}
});
//DISCORD!!!!
bot.on('ready', () => {
	console.log(
		`Bot has started, with ${bot.users.size} users, in ${bot.channels
			.size} channels of ${bot.guilds.size} guilds.`
	);
	//sendChat(`Bot has started, with ${bot.users.size} users, in ${bot.channels.size} channels of ${bot.guilds.size} guilds.`, lang)
	bot.user.setGame(`on ${bot.guilds.size} servers`);
	MPP.client.on('a', msg => {
		if (msg.p._id == MPP.client.getOwnParticipant()._id) return;
		if (msg.a.includes('@everyone')) return;
		dChat(
			'450147357208870924',
			`**${msg.p.name.split('').join('\u034f')}** (\`${msg.p._id.substring(
				0,
				4
			)}\`): ${msg.a}`
		);
	});
});

bot.on('ready', () => {
	const dop = [
		'251985222915194881',
		'210605340201451521',
		'209015289990348800',
		'362315641161515008',
	];
	bot.on('message', message => {
		function cdChat(msg) {
			if (lang == 'en') {
				message.author.lastMessage.channel.send(
					`${message.author.username}: ${msg}`
				);
			} else {
				translate(msg, lang).then(oof => {
					message.author.lastMessage.channel.send(
						`${message.author.username}: ${oof}`
					);
				});
			}
		}

		if (message.author.bot) return;

		if (message.channel.id == '450147357208870924') {
			if (!MPP.client.isConnected()) return;
			if (
				message.content.startsWith('.') ||
				message.content.startsWith('/') ||
				message.content.startsWith('>') ||
				message.content.startsWith('<') ||
				message.content.startsWith('^') ||
				message.content.startsWith('?') ||
				message.content.startsWith('!') ||
				message.content.startsWith('/')
			) {
				MPP.client.sendArray([
					{
						m: 'a',
						message: message.content,
					},
				]);
			} else {
				MPP.client.sendArray([
					{
						m: 'a',
						message: `${message.author.username}: ${message.content}`,
					},
				]);
			}
		}

		if (message.content.indexOf(cmdChar) !== 0) return;

		const user = message.author;

		const args = message.content.slice(cmdChar.length).trim().split(/ +/g);

		const command = args.shift().toLowerCase();

		let isAdmind = false;

		const input = message.content
			.substring(cmdChar.length + command.length)
			.trim();

		//console.log(input)

		if (dop.includes(user.id)) isAdmind = true;

		if (command == 'js') {
			if (isAdmind) {
				try {
					cdChat(`Console: ${eval(input)}`);
				} catch (err) {
					cdChat(`${err}`);
				}
			}
		}
	});
});
count = 0;
function name() {
	names = {
		0: `${botname} [discord.gg/AastTwg]`,
		1: `Uptime: ${sectoform(Math.round(Date.now() / 1000) - start)}`,
		2: `${botname} [${cmdChar}help]`,
	};
	MPP.client.sendArray([
		{
			m: 'userset',
			set: {
				name: names[count++],
			},
		},
	]);
	if (count >= Object.keys(names).length) count = 0;
}
setInterval(name, 3000);
const info = require('./main.json');
bot.login(info.BOT_TOKEN);
