const RANKS = {
    names: ['rank', 'tier', 'tetr', 'pent', 'hex', 'hept', 'oct', 'enne'],
    fullNames: ['级别', '阶层', '三重阶层', '五重阶层', '六重阶层', '七重阶层', '八重阶层', '九重阶层'],
    reset(type) {
        if (tmp.ranks[type].can) {
            player.ranks[type] = player.ranks[type].add(1)
            let reset = true
            if (type == "rank" && player.mainUpg.rp.includes(4)) reset = false
            if (type == "tier" && player.mainUpg.bh.includes(4)) reset = false
            if (type == "tetr" && hasTree("qol5")) reset = false
            if (type == "pent" && hasTree("qol8")) reset = false
            if (type == "hex" && hasPrestige(1,27)) reset = false
            if (type == "hept" && hasPrestige(2,18)) reset = false
            if (type == "oct" && hasPrestige(3,9)) reset = false
            if (hasPrestige(3,38)) reset = false
            if (reset) this.doReset[type]()
            updateRanksTemp()
        }
    },
    bulk(type) {
        if (tmp.ranks[type].can) {
            player.ranks[type] = player.ranks[type].max(tmp.ranks[type].bulk.max(player.ranks[type].add(1)))
            let reset = true
            if (type == "rank" && player.mainUpg.rp.includes(4)) reset = false
            if (type == "tier" && player.mainUpg.bh.includes(4)) reset = false
            if (type == "tetr" && hasTree("qol5")) reset = false
            if (type == "pent" && hasTree("qol8")) reset = false
            if (type == "hex" && hasPrestige(1,27)) reset = false
            if (type == "hept" && hasPrestige(2,18)) reset = false
            if (type == "oct" && hasPrestige(3,9)) reset = false
            if (hasPrestige(3,38)) reset = false
            if (reset) this.doReset[type]()
            updateRanksTemp()
        }
    },
    unl: {
        tier() { return player.ranks.rank.gte(3) || player.ranks.tier.gte(1) || player.mainUpg.atom.includes(3) || tmp.radiation.unl },
        tetr() { return player.mainUpg.atom.includes(3) || tmp.radiation.unl },
        pent() { return tmp.radiation.unl },
        hex() { return player.prestiges[0].gte(42) },
        hept() { return player.prestiges[2].gte(6) },
        oct() { return player.prestiges[2].gte(30) },
        enne() { return player.prestiges[3].gte(38) },
    },
    doReset: {
        rank() {
            player.mass = E(0)
            for (let x = 1; x <= UPGS.mass.cols; x++) if (player.massUpg[x]) player.massUpg[x] = E(0)
        },
        tier() {
            player.ranks.rank = E(0)
            this.rank()
        },
        tetr() {
            player.ranks.tier = E(0)
            this.tier()
        },
        pent() {
            player.ranks.tetr = E(0)
            this.tetr()
        },
        hex() {
            player.ranks.pent = E(0)
            this.pent()
        },
        hept() {
            player.ranks.hex = E(0)
            this.hex()
        },
        oct() {
            player.ranks.hept = E(0)
            this.hept()
        },
        enne() {
            player.ranks.oct = E(0)
            this.oct()
        },
    },
    autoSwitch(rn) { player.auto_ranks[rn] = !player.auto_ranks[rn] },
    autoUnl: {
        rank() { return player.mainUpg.rp.includes(5) },
        tier() { return player.mainUpg.rp.includes(6) },
        tetr() { return player.mainUpg.atom.includes(5) },
        pent() { return hasTree("qol8") },
        hex() { return true; },
        hept() { return true; },
        oct() { return true; },
        enne() { return true; },
    },
    desc: {
        rank: {
            '1': "使质量获取速度变为原来的1.2倍。",
            '2': "使质量获取速度变为原来的1.5倍，使质量升级1的花费折算弱化20%。",
            '3': "使质量获取速度变为原来的2倍，解锁质量升级3，使质量升级2的花费折算弱化20%，质量升级1的效果对自身生效。",
            '4': "使质量升级3的花费折算弱化20%。",
            '5': "使质量升级2的效果对自身生效。",
            '6': "使质量获取速度乘以(级别+1)的平方。",
            '13': "使质量获取速度变为原来的3倍。",
            '14': "使狂怒能量获取速度翻倍。",
            '17': "使级别6的奖励公式变得更好。即原公式的指数从2变为级别的1/3次方。",
            '34': "使质量升级3的软上限延迟1.2倍出现。",
            '40': "基于级别的数值，增加时间速度倍率。",
            '45': "使级别可以加成狂怒能量获取速度。",
            '90': "使级别40的奖励变得更好。",
            '180': "使质量获取速度变为原来的1.025次方。",
            '220': "使级别40的奖励变得滥强。",
            '300': "使级别可以加成夸克获取速度。",
            '380': "使级别可以加成质量获取速度。",
            '800': "基于级别的数值，使质量获取速度的软上限弱化0.25%。",
        },
        tier: {
            '1': "使级别的需求减少20%。",
            '2': "使质量获取速度变为原来的1.15次方。",
            '3': "使所有质量升级的花费折算弱化20%。",
            '4': "每有1个阶层，时间速度倍率就增加5%，在增加40%时达到软上限。",
            '6': "使阶层可以加成狂怒能量。",
            '8': "使阶层6的奖励效果基于暗物质的数值变得更强。",
            '12': "使阶层4的奖励效果翻倍，且移除软上限。",
            '30': "使强化器效果的软上限弱化10%。",
            '55': "使级别380的效果基于阶层的数值变得更强。",
            '100': "使三重阶层的超级折算延迟5次出现。",
        },
        tetr: {
            '1': "使阶层的需求减少25%，级别的究级折算弱化15%。",
            '2': "使质量升级3的效果对自身生效。",
            '3': "使时间速度效果变为原来的1.05次方。",
            '4': "使级别的超级折算基于阶层的数值而弱化，阶层的超级折算弱化20%。",
            '5': "使时间速度的究级折算和超究折算基于三重阶层的数值而延迟出现。",
            '8': "使质量获取速度的二重软上限延迟1.5次方出现。",
        },
        pent: {
            '1': "使三重阶层的需求减少15%，级别的元折算延迟1.1倍出现。",
            '2': "使三重阶层可以加成射线的获取速度。",
            '4': "使时间速度的元折算基于超新星次数而延迟出现。",
            '5': "使级别的元折算基于五重阶层的数值而延迟出现。",
            '8': "使质量获取速度的四重软上限基于五重阶层的数值而延迟出现。",
            '15': "移除强化器效果的三重软上限。",
        },
        hex: {
            '1': "移除质量获取速度的一重软上限，氢(1H)的效果变得更强。",
            '2': "使硬化挑战的折算效果弱25%。",
            '3': "锂(3Li)的效果变为原来的1.5次方（在软上限之前)。",
            '4': "移除质量获取速度的二重软上限,铍(4Be)的效果变为原来的1.05次方。",
            '5': "六重阶层增加转生基础值指数。",
            '6': "碳 (6C) 提升希格斯玻色子的效果。",
            '7': "氮(7N)的效果变得更强。",
            '8': "移除质量获取速度的三重软上限。",
            '9': "使三重阶层要求降低 15%。",
            '10': "氖(10Ne)的效果变得更强。",
            '11': "钠(11Na)在购买了钫(87Fr)后也能生效。",
            '12': "镁(12Mg)的效果变得更强。",
            '13': "移除质量获取速度的四重软上限。",
            '15': "镁(12Mg)的效果变得更强。",
            '16':"硫(16S)的效果现在是100%。",
            '17': "使原子的获取速度变为原来的1.1次方。",
            '18': "氩(18Ar)的效果变得更强。",
            '19': "钾(19K)的效果变得更强。",
            '20': "使挑战7的次数上限增加1e5次。",
            '21': "移除质量获取速度的五重软上限。",
            '22': "钛(22Ti)的效果变得更强。",
            '23': "钒(23V)的效果变得更强。",
            '24': "铬(24Cr)的效果变得更强。",
            '25': "使质量膨胀升级1的基础效果增加1倍。",
            '26': "移除铁(26Fe)的软上限和硬上限。",
			'27': "使级别和时间速度的究级折算和超究折算弱化25%。",
            '28': "镍(28Ni)也在质量膨胀之外生效。",
            '29': "铜(29Cu)的效果变得更强。",
            '30': "锌(30Zn)的效果变得更强",
            '31': "镓(31Ga)的效果变得更强。",
            '32': "使膨胀质量获取速度的指数增加5%。",
            '33': "移除质量获取速度的六重软上限。",
            '34': "硒(34Se)的效果变得更强。",
            '35': "溴(35Br)的效果变得更强。",
            '36': "坍缩星辰的效果增加指数加成。",
            '37': "铷(37Rb)的效果始终为 100%。",
            '38': "锶(38Sr)的效果翻倍。",
            '39': "使挑战4的奖励软上限弱化。",
            '40': "锆(40Zr)的效果变得更强。",
            '41': "使挑战12的次数上限增加500次。",
            '42': "钼(42Mo)的效果变得更强。",
            '43': "移除质量膨胀惩罚。",
            '44': "使三重阶层的需求大幅降低。",
            '45': "铑(45Rh)的效果变得更强。",
            '46': "钯(46Pd)的效果变得更强。",
			'47': "使夸克的获取指数变为原来的1.1次方。",
			'48': "使坍缩星辰效果增加10%。",
			'49': "铟(49In)的效果变得更强。",
			'50': "使星辰发生器的速度变为原来的1.05次方。",
			'51': "使质量获取速度的九重软上限弱化10%。",
			'52': "碲(52Te)的效果变得更强。",
			'53': "使质量膨胀升级6的效果增加75%。",
            '54': "移除质量获取速度的七重软上限。",
			'55': "使黑洞压缩器和宇宙射线的究级和超究折算弱化25%。",
			'56': "使挑战12的次数上限增加500次。",
			'57': "镧(57La)的效果变为原来的1。1次方。",
            '58': "铈(58Ce)的效果始终为100%。",
            '59': "镨(59Pr)的效果现在为0.5。",
			'60': "使挑战12的次数上限增加500次。",
			'61': "使粒子能量的获取速度在到达软上限以后，乘以粒子数量的0.5次方。",
			'62': "使级别的元折算基于前往超新星的次数而延迟出现,",
			'63': "使非加成的时间速度效果变为原来的25倍。",
			'64': "移除质量获取速度的八重软上限。",
			'65': "使挑战12的次数上限增加1000次。",
			'66': "镧(57La)的效果变为原来的1.1次方。",
			'67': "钬(67Ho)的效果变得更强。",
			'68': "使时间速度的元折算延迟2倍出现。",
			'69': `坍缩星辰加成它本身的效果。`,
			'70': "使挑战12的次数上限增加1000次。",
			'71': "使黑洞质量增益软上限基于六重阶层的数值而弱化。",
			'72': "使三重阶层的需求减少15%，如果你在大撕裂中或者六重阶层不低于100，此效果会生效两次。",
			'73': "使挑战12的次数上限增加1000次。如果你在大撕裂中,使[缪中微子]的软上限更弱。",
			'74': `使三重阶层的超级折算弱化10%。`,
			'75': "移除质量获取速度的九重软上限。",
			'76': "坍塌星辰的效果增强25%",
			'78': `使超新星的元折算弱化5%。`,
			'80': "移除级别和时间速度元折算之前的所有折算。",
			'82': "移除黑洞压缩器和宇宙射线元折算之前的所有折算。",
			'84': "钋(84Po)的效果始终为100%。",
			'86': "使时间速度倍率平方。",
			'88': "使时间速度的元折算延迟100倍出现。",
			'90': "钍(90Th)的效果变为原来的1。1次方。",
			'92': "使疯狂挑战的折算效果弱化25%，除了挑战9。",
			'93': "镎(93Np)的效果基数是100%而不是66.7%",
			'95': "移除质量升级和阶层超究折算之前的所有折算。",
			'97': `熵消耗的效果基数增加0.1。`,
			'98': "移除超新星元折算之前的所有折算。",
			'99': `移除光子升级3效果之前的所有软上限。`,
			'103': `鿭(113Nh)的效果基数是2.1而不是2。`,
			'104': "使挑战12的次数上限增加2000次。",
			'110': "使挑战12的次数上限增加2000次。",
			'114': `熵加倍使用更好的公式。`,
			'115': `使质量膨胀升级增强5%。`,
			'116': "𫟷(116Lv)的效果变得更强。",
			'119': "使元素119的效果平方。",
			'120': "使质量的溢出延迟10次方出现。",
			'123': "使时间速度的元折算基于加速器的数量而延迟出现。",
			'124': "使加速器的倍率基于购买时间速度的数量而增加。",
			'125': "使六重阶层加成熵获取速度。",
			'126': "使六重阶层加成加速器的倍率。",
			'127': "使六重阶层加成无限质量。",
			'129': "在大撕裂中，使量子挑战“阶层超量”的效果弱化50%。",
			'135': "在大撕裂中，使量子挑战“极端折算”的效果弱化40%。",
			'140': "使加速器的倍率基于挑战2完成的次数而增加。",
			'238': "移除三重阶层的超级折算。",
			'300': "使质量升级的超究折算弱化2%。",
			'777': "使级别的的元折算弱化99.99999999%。",
			'888': "使级别的的元折算弱化99.99999999%。",
			'999': "使级别的的元折算弱化99.99999999%。",
			'1005': "使级别的元折算基于七重阶层的数值而弱化。",
        },
        hept: {
            '1': "使质量的溢出基于七重阶层的数值而弱化.",
            '2': "使坍缩星辰的溢出基于七重阶层的数值而弱化.",
            '3': "使阶层的超究折算基于七重阶层的数值而弱化.",
            '4': "使加速器的倍率基于七重阶层的数值而增加.",
            '5': "七重阶层1和3的效果变得更强.",
            '6': "使量子之前所有资源获取速度基于七重阶层的数值而增加.",
			'8': "使三重阶层的的究极折算弱化10%.",
			'9': "使三重阶层的的究极折算弱化30%.",
			'10': "使三重阶层的的究极折算弱化50%.",
			'11': "移除三重阶层的的究极折算.",
			'13': "七重阶层3的效果变得更强.",
			'14': "七重阶层3的效果也能弱化三重阶层的的超究折算.",
			'15': "移除阶层的超究折算.",
			'16': "移除三重阶层的超究折算.",
			'17': "使级别的元折算基于七重阶层的数值而延迟.",
			'19': "七重阶层17的效果变得更强.",
			'20': "使阶层的元折算基于七重阶层的数值而延迟.",
			'21': "使五重阶层的的超极折算弱化20%.",
			'22': "使质量升级的超究折算弱化1%.",
			'30': "使五重阶层的的超极折算弱化40%.",
			'40': "红色色度的效果变为原来的3次方",
			'52': "使熵的获取速度基于七重阶层的数值而增加.",
			'100': "移除七重阶层1效果的硬上限.",
		},
		oct: {
            '1': "使六重阶层的超级折算和究极折算基于八重阶层的数值而弱化.",
            '2': "使三重阶层的元折算基于八重阶层的数值而延迟.",
            '3': "使三重阶层2效果的软上限弱化.",
			'4': "移除五重阶层的究级折算.",
			'5': "移除五重阶层的超究折算.",
			'6': "八重阶层2的效果变得更强.",
			'8': "使强化器的溢出弱化.",
			'9': "使加速器效果的二重软上限延迟至2.5倍出现且弱化.",
			'10': "使八重阶层加成无限质量和永恒质量.",
			'12': "使八重阶层加成七重阶层52的效果.",
			'17': "使六重阶层的的元折算弱化99.6%.",
			'20': "移除六重阶层的超级折算.八重阶层1的效果也能弱化六重阶层的的超究折算和元折算.",
			'21': "使加速器效果的二重软上限延迟至2倍出现且弱化.",
			'29': "使加速器效果的二重软上限延迟至2倍出现且弱化.",
			'33': "使加速器效果的二重软上限弱化.",
			'34': "使八重阶层加成奇异物质获取.",
			'35': "使八重阶层34的效果平方.",
			'46': "使降伏器的的超级折算弱化4%.",
		},
		enne: {
            '1': "使转生暗物质的获取速度变为原来的10倍.",
            '2': "使五重阶层的元折算基于九重阶层的数值而延迟.",
            '3': "使强化器的溢出弱化.",
            '4': "使降伏器的的超级折算弱化1%.",
			'5': "使九重阶层加成奇异物质的获取.",
			'6': "使九重阶层加成星系夸克的获取.",
            '7': "使七重阶层的究极折算和超究折算基于九重阶层的数值而弱化.",
            '9': "使七重阶层的元折算基于九重阶层的数值而弱化.",
            '10': "使九重阶层加成黑暗之影的获取.",
            '11': "八重阶层1的效果变得更强.",
            '12': "坍缩星辰的效果变得更强.",
            '14': "使六重阶层的元折算基于九重阶层的数值而弱化.",
            '15': "使七重阶层的元折算延迟至7.5倍出现.",
            '100': "解锁超等级，以及将级别,阶层,三重阶层,五重阶层显示在一起.",
            '101': "使十重阶层加成奇异物质的获取.",
            '102': "使六重阶层的元折算基于九重阶层的数值而延迟.",
            '117': "使六重阶层的元折算延迟至1e50倍出现.",
            '140': "移除五重阶层2效果的软上限.",
            '200': "奇异推进“暗物质推进器”同样影响黑洞质量.",
            '250': "使十重阶层加成暗射线的获取.",
            '300': "使十重阶层加成星尘的获取.",
            '666': "使超新星的元折算弱化99.99%.",
            '1580': "九重阶层7,9,14的效果变得更强.",
            '2400': "元素550的效果现在是40%而不是50%.",
            '2440': "九重阶层14的效果变得更强.",
            '2500': "使七重阶层的元折算延迟至2倍出现.",
            '2650': "使七重阶层的元折算延迟至2倍出现.",
            '2800': "使七重阶层的元折算延迟至2倍出现.",
            '3340': "使七重阶层的元折算延迟至2倍出现.",
            '3690': "使超新星的元折算弱化99.99%.",
            '3720': "使七重阶层的元折算延迟至2倍出现.",
            '4480': "使超新星的元折算弱化99.99%.",
            '5740': "使六重阶层的元折算基于自身延迟出现.",
            '7360': "使之前的九重阶层的效果变得更强.",
            '9000': "使十重阶层加成奇异物质的获取.",
            '9590': "九重阶层14的效果变得更强.",
            '11280': "使七重阶层的元折算延迟至2倍出现.",
            '13620': "使十一重阶层加成九重阶层6的效果.",
            '13625': "使十一重阶层加成九重阶层102的效果.",
            '19275': "转生原子的效果也可以对星系费米子的究级折算生效，且转生原子的获取速度是原来的1000倍.",
            '19955': "使十一重阶层加成九重阶层300的效果.",
            '20001': "使转生暗物质的获取速度变为原来的10次方.",
            '20002': "使六重阶层的元折算基于九重阶层的数值而延迟.",
            '20003': "使强化器的溢出弱化.",
            '20004': "使降伏器的的究级折算弱化10%.",
		},
    },
    effect: {
        rank: {
            '3'() {
                let ret = E(player.massUpg[1]||0).div(20)
                return ret
            },
            '5'() {
                let ret = E(player.massUpg[2]||0).div(40)
                return ret
            },
            '6'() {
                let ret = player.ranks.rank.add(1).pow(player.ranks.rank.gte(17)?player.ranks.rank.add(1).root(3):2)
				if(ret.gte("eee55"))ret = overflow(ret,"eee55",0.5);
                return ret
            },
            '40'() {
                let ret = player.ranks.rank.root(2).div(100)
                if (player.ranks.rank.gte(90)) ret = player.ranks.rank.root(1.6).div(100)
                if (player.ranks.rank.gte(220)) ret = player.ranks.rank.div(100)
                return ret
            },
            '45'() {
                let ret = player.ranks.rank.add(1).pow(1.5)
                return ret
            },
            '300'() {
                let ret = player.ranks.rank.add(1)
                return ret
            },
            '380'() {
                let ret = E(10).pow(overflow(player.ranks.rank.sub(379).pow(1.5).pow(player.ranks.tier.gte(55)?RANKS.effect.tier[55]():1).softcap(1000,0.5,0),"1e2500",0.1))
                return ret
            },
            '800'() {
                let ret = E(1).sub(player.ranks.rank.sub(799).mul(0.0025).add(1).softcap(1.25,0.5,0).sub(1)).max(0.75)
                return ret
            },
        },
        tier: {
            '4'() {
                let ret = E(0)
                if (player.ranks.tier.gte(12)) ret = player.ranks.tier.mul(0.1)
                else ret = player.ranks.tier.mul(0.05).add(1).softcap(1.4,0.75,0).sub(1)
                return ret
            },
            '6'() {
                let ret = E(2).pow(player.ranks.tier)
                if (player.ranks.tier.gte(8)) ret = ret.pow(RANKS.effect.tier[8]())
                return ret
            },
            '8'() {
                let ret = player.bh.dm.max(1).log10().add(1).root(2)
				ret = overflow(ret,"ee36",0.9);
                return ret
            },
            '55'() {
                let ret = player.ranks.tier.max(1).log10().add(1).root(4)
                return ret
            },
        },
        tetr: {
            '2'() {
                let ret = E(player.massUpg[3]||0).div(400)
                if (ret.gte(1) && hasPrestige(0,15)) ret = ret.pow(1.5)
				ret = ret.softcap("e4.5e6", player.ranks.oct.gte(3)?0.8:0.5, 0);
				ret = overflow(ret, "e1.8e10", 0.8);
                return ret
            },
            '4'() {
                let ret = E(0.96).pow(player.ranks.tier.pow(1/3))
                return ret
            },
            '5'() {
                let ret = player.ranks.tetr.pow(4).softcap(1000,0.25,0)
                return ret
            },
        },
        pent: {
            '2'() {
                let ret = E(1.3).pow(player.ranks.tetr.softcap("1e2000000",player.ranks.enne.gte(140)?1:0.6,2).softcap("e2e30",0.5,2));
                return ret
            },
            '4'() {
                let ret = player.supernova.times.add(1).root(5)
                return ret
            },
            '5'() {
                let ret = overflow(E(1.05).pow(player.ranks.pent),1e10,hasPrestige(1,63)?0.15:0.1);
                return ret
            },
            '8'() {
                let ret = E(1.1).pow(player.ranks.pent)
                return ret
            },
        },
        hex: {
            '5'() {
                let ret = player.ranks.hex.div(1000).softcap(40,0.25,0)
				if(ret.gte(100))ret = ret.log10().pow(2).mul(25)
                return ret
            },
            '62'() {
                let ret = Decimal.pow(1.0001,player.supernova.times);
                return ret
            },
            '71'() {
                let ret = Decimal.pow(0.93,player.ranks.hex.sub(70));
                return ret
            },
            '123'() {
                let ret = player.accelerator.add(1);
                return ret
            },
            '124'() {
                let ret = player.tickspeed.add(1).log10().div(15).max(1);
                return ret
            },
            '125'() {
                let ret = player.ranks.hex.add(1);
                return ret
            },
            '126'() {
                let ret = player.ranks.hex.div(100);
				if(ret.gte("1e600"))ret = ret.log10().div(60).pow(600);
				ret = ret.softcap("1e1000",0.5,0);
                return ret
            },
            '127'() {
                let ret = player.ranks.hex.add(1);
                return ret
            },
            '140'() {
                let ret = player.chal.comps[2].div(200000).add(1);
                return ret
            },
            '1005'() {
                let ret = E(0.99).pow(player.ranks.hept.pow(2.2));
                return ret
            },
        },
        hept: {
            '1'() {
                let ret = E(0.98).pow(player.ranks.hept);
				if(player.ranks.hept.gte(5))ret = ret.pow(1.2);
				ret = ret.max(1/3);
				if(player.ranks.hept.gte(100))ret = E(1).div(E(1).add(player.ranks.hept.log10()));
                return ret
            },
            '2'() {
                let ret = E(0.9).pow(player.ranks.hept);
                return ret
            },
            '3'() {
                let ret = E(0.99).pow(player.ranks.hept);
				if(player.ranks.hept.gte(5))ret = ret.pow(1.2);
				if(player.ranks.hept.gte(13))ret = ret.pow(3.2);
                return ret
            },
            '4'() {
				let ret = player.ranks.hept.softcap(30000,0.1,0).softcap(60000,0.1,0);
				if(ret.gte(1e5))ret = ret.log10().pow(2).mul(4000);
                ret = E(1.01).pow(ret);
                return ret
            },
            '6'() {
                let ret = player.ranks.hept.add(1);
                return ret
            },
            '17'() {
                let ret = E(10).pow(player.ranks.hept);
				if(player.ranks.hept.gte(19))ret = E(1.001).pow(player.ranks.hept.pow(4));
                return ret
            },
            '20'() {
                let ret = E(1.1).pow(player.ranks.hept);
                return ret
            },
            '52'() {
                let ret = E(10).pow(player.ranks.hept);
				if(player.ranks.oct.gte(12))ret = ret.pow(player.ranks.oct);
                return ret
            },
		},
		oct: {
            '1'() {
                let ret = E(player.ranks.enne.gte(11)?0.97:0.98).pow(player.ranks.oct);
                return ret
            },
            '2'() {
                let ret = E(10).pow(player.ranks.oct);
				if(player.ranks.oct.gte(6))ret = E(10).pow(player.ranks.oct.pow(4));
                return ret
            },
            '10'() {
                let ret = player.ranks.oct.pow(6);
                return ret
            },
            '12'() {
                let ret = player.ranks.oct;
                return ret
            },
            '34'() {
                let ret = player.ranks.oct.add(1).log10().pow(2);
				if(player.ranks.oct.gte(35))ret = ret.pow(2);
                return ret
            },
		},
		enne: {
            '2'() {
                let ret = E(10).pow(player.ranks.enne.pow(2));
                return ret
            },
            '5'() {
                let ret = player.ranks.enne.add(1).pow(2);
                return ret
            },
            '6'() {
                let ret = player.ranks.enne.add(1).pow(2);
                if(player.ranks.enne.gte(13620))ret = ret.pow(beyondRankTier(10).add(1).pow(0.5));
                return ret
            },
            '7'() {
                let ret = E(0.99).pow(player.ranks.enne.softcap(75,0.5,0)).max(1/3);
				if(player.ranks.enne.gte(1580))ret = E(1).div(player.ranks.enne.log10().add(1));
                return ret
            },
            '9'() {
                let ret = E(0.99).pow(player.ranks.enne.softcap(75,0.5,0)).max(1/3);
				if(player.ranks.enne.gte(1580))ret = E(1).div(player.ranks.enne.log10().add(1));
                return ret
            },
            '10'() {
                let ret = player.ranks.enne.add(1).pow(2);
                return ret
            },
            '14'() {
                let ret = E(0.99).pow(player.ranks.enne.softcap(75,0.5,0)).max(1/3);
				if(player.ranks.enne.gte(1580))ret = E(1).div(player.ranks.enne.log10().add(1));
				if(player.ranks.enne.gte(2440))ret = E(0.9).pow(player.ranks.enne.pow(player.ranks.enne.gte(9590)?1.1:1));
				if(hasPrestige(4,74))ret = E(0.5).pow(player.ranks.enne.pow(player.ranks.enne.gte(9590)?1.1:1));
				if(hasAscension(2,24))ret = E(0.1).pow(player.ranks.enne.pow(player.ranks.enne.gte(9590)?1.1:1));
                return ret
            },
            '101'() {
                let ret = beyondRankTier(9).add(1).pow(3);
                return ret
            },
            '102'() {
                let ret = E(10).pow(player.ranks.enne);
                if(player.ranks.enne.gte(13625))ret = ret.pow(beyondRankTier(10).add(1));
                return ret
            },
            '250'() {
                let ret = beyondRankTier(9).add(1).pow(2);
                return ret
            },
            '300'() {
                let ret = beyondRankTier(9).add(1).pow(2);
                if(player.ranks.enne.gte(19955))ret = ret.pow(beyondRankTier(10).add(1).pow(0.5));
                return ret
            },
            '9000'() {
                let ret = beyondRankTier(9).add(1).pow(2);
                return ret
            },
            '13620'() {
                let ret = beyondRankTier(10).add(1).pow(0.5);
                return ret
            },
            '13625'() {
                let ret = beyondRankTier(10).add(1);
                return ret
            },
            '19955'() {
                let ret = beyondRankTier(10).add(1).pow(0.5);
                return ret
            },
		},
    },
    effDesc: {
        rank: {
            3(x) { return "+"+format(x) },
            5(x) { return "+"+format(x) },
            6(x) { return format(x)+"倍" },
            40(x) {  return "+"+format(x.mul(100))+"%" },
            45(x) { return format(x)+"倍" },
            300(x) { return format(x)+"倍" },
            380(x) { return format(x)+"倍" },
            800(x) { return "弱化"+format(E(1).sub(x).mul(100))+"%" },
        },
        tier: {
            4(x) { return "+"+format(x.mul(100))+"%" },
            6(x) { return format(x)+"倍" },
            8(x) { return "^"+format(x) },
            55(x) { return "^"+format(x) },
        },
        tetr: {
            2(x) { return "+"+format(x) },
            4(x) { return "弱化"+format(E(1).sub(x).mul(100))+"%" },
            5(x) { return "延迟"+format(x,0)+"次出现" },
        },
        pent: {
            2(x) { return format(x)+"倍" },
            4(x) { return "延迟"+format(x)+"倍出现" },
            5(x) { return "延迟"+format(x)+"倍出现" },
            8(x) { return "延迟"+format(x)+"次方出现" },
        },
        hex: {
         5(x) { return "+"+format(x)},
            62(x) { return "延迟"+ format(x)+"倍出现" },
            71(x) { return "弱化"+format(E(1).sub(x).mul(100))+"%" },
            123(x) { return format(x)+"倍出现" },
            124(x) { return format(x)+"x" },
            125(x) { return format(x)+"x" },
            126(x) { return format(x)+"x" },
            127(x) { return format(x)+"x" },
            140(x) { return format(x)+"x" },
            1005(x) { return "弱化"+format(E(1).sub(x).mul(100))+"%" },
        },
        hept: {
            1(x) { return "弱化"+format(E(1).sub(x).mul(100))+"%" },
            2(x) { return "弱化"+format(E(1).sub(x).mul(100))+"%" },
            3(x) { return "弱化"+format(E(1).sub(x).mul(100))+"%" },
            4(x) { return format(x)+"x" },
            6(x) { return format(x)+"x" },
            17(x) { return "延迟"+format(x)+"倍出现" },
            20(x) { return "延迟"+format(x)+"倍出现" },
            52(x) { return format(x)+"x" },
		},
		oct: {
            1(x) { return format(E(1).sub(x).mul(100))+"%" },
            2(x) { return "延迟"+format(x)+"倍出现" },
            10(x) { return format(x)+"x" },
            12(x) { return "^"+format(x) },
            34(x) { return format(x)+"x" },
		},
		enne: {
            2(x) { return "延迟"+format(x)+"倍出现" },
            5(x) { return format(x)+"x" },
            6(x) { return format(x)+"x" },
            7(x) { return "弱化"+format(E(1).sub(x).mul(100))+"%" },
            9(x) { return "弱化"+format(E(1).sub(x).mul(100))+"%" },
            10(x) { return format(x)+"x" },
            14(x) { return "弱化"+format(E(1).sub(x).mul(100))+"%" },
            101(x) { return format(x)+"x" },
            102(x) { return "延迟"+format(x)+"倍出现" },
            250(x) { return format(x)+"x" },
            300(x) { return format(x)+"x" },
            9000(x) { return format(x)+"x" },
            13620(x) { return "^"+format(x) },
            13625(x) { return "^"+format(x) },
            19955(x) { return "^"+format(x) },
		},
    },
    fp: {
        rank() {
            let f = E(1)
            if (player.ranks.tier.gte(1)) f = f.mul(1/0.8)
            if (!hasElement(170))f = f.mul(tmp.chal.eff[5].pow(-1))
            return f
        },
        tier() {
            let f = E(1)
            f = f.mul(tmp.fermions.effs[1][3])
            if (player.ranks.tetr.gte(1)) f = f.mul(1/0.75)
            if (player.mainUpg.atom.includes(10)) f = f.mul(2)
            return f
        },
    },
}

const PRESTIGES = {
    fullNames: ["转生等级", "荣耀", "辉煌", "名誉", "英勇"],
    baseExponent() {
        let x = E(0)
        if (hasElement(100)) x = x.add(tmp.elements.effect[100])
        if (hasPrestige(0,32)) x = x.add(prestigeEff(0,32,0))
        if (player.ranks.hex.gte(5)) x = x.add(RANKS.effect.hex[5]())
        if (hasTree('qc8')) x = x.add(treeEff('qc8',0))
		if(hasAscension(0,12))x = x.add(ascensionEff(0,12,E(0)));
		x = x.add(tmp.ascensionMassEffect);
		if(hasElement(486))x = x.add(MATTERS.eff(4));
        return x.add(1)
    },
    base() {
        let x = E(1)

        for (let i = 0; i < RANKS.names.length; i++) {
            let r = player.ranks[RANKS.names[i]]
            if (hasPrestige(0,18) && i == 0) r = r.mul(2)
            x = x.mul(r.add(1))
        }

        return x.sub(1)
    },
    req(i) {
        let x = EINF, y = player.prestiges[i]
        switch (i) {
            case 0:
                x = Decimal.pow(1.1,y.scaleEvery('prestige0').pow(1.1)).mul(2e13)
                break;
            case 1:
                x = y.scaleEvery('prestige1').pow(1.25).mul(3).add(4)
                break;
            case 2:
                x = y.scaleEvery('prestige2').pow(1.25).mul(3).add(12)
                break;
            case 3:
                x = y.scaleEvery('prestige3').pow(1.25).mul(3).add(33)
                break;
            case 4:
                x = y.scaleEvery('prestige4').pow(1.25).mul(3).add(50)
                break;
            default:
                x = EINF
                break;
        }
        return x.ceil()
    },
    bulk(i) {
        let x = E(0), y = i==0?tmp.prestiges.base:player.prestiges[i-1]
        switch (i) {
            case 0:
                if (y.gte(2e13)) x = y.div(2e13).max(1).log(1.1).max(0).root(1.1).scaleEvery('prestige0',true).add(1)
                break;
            case 1:
                if (y.gte(4)) x = y.sub(4).div(3).max(0).root(1.25).scaleEvery('prestige1',true).add(1)
                break
            case 2:
                if (y.gte(12)) x = y.sub(12).div(3).max(0).root(1.25).scaleEvery('prestige2',true).add(1)
                break
            case 3:
                if (y.gte(33)) x = y.sub(33).div(3).max(0).root(1.25).scaleEvery('prestige3',true).add(1)
                break
            case 4:
                if (y.gte(50)) x = y.sub(50).div(3).max(0).root(1.25).scaleEvery('prestige4',true).add(1)
                break
            default:
                x = E(0)
                break;
        }
        return x.floor()
    },
    unl: [
        _=>true,
        _=>true,
        _=>hasPrestige(1,12) || hasPrestige(2,1),
        _=>hasPrestige(2,33) || hasPrestige(3,1),
        _=>hasAscension(0,30) || hasPrestige(4,1),
    ],
    noReset: [
        _=>hasUpgrade('br',11) || player.superGal.gte(9),
        _=>hasPrestige(2,2) || player.superGal.gte(9),
        _=>player.superGal.gte(9),
        _=>player.superGal.gte(9),
        _=>player.superGal.gte(9),
    ],
    rewards: [
        {
            "1": `使到五重质量软上限为止的所有质量软上限延迟10次方出现。`,
            "2": `量子碎片的基础效果指数增加0.5。`,
            "3": `使量子泡沫和死寂碎片获取速度变为原来的4倍。`,
            "5": `使量子之前所有资源获取速度变为原来的2次方(在计算削弱之前生效)。`,
            "6": `使时间速度倍率的软上限延迟100次方出现。`,
            "8": `使质量获取速度的五重软上限基于转生等级而延迟出现。`,
            "10": `使相对论能量的获取速度基于转生等级而增加。`,
            "12": `使强化器效果的二重软上限弱化7.04%。`,
            "15": `使三重阶层2的奖励变得滥强。`,
            "18": `使计算转生基础值时级别的数值翻倍。`,
            "24": `使宇宙弦的超级折算弱化20%。`,
            "28": `移除胶子升级4的所有软上限。`,
            "32": `使转生基础值的指数基于转生等级而增加。`,
            "40": `使铬(24Cr)的效果略微增加。`,
            "42": `解锁六重阶层。`,
            "45": `使三重阶层的超究折算弱化42%。`,
            "50": `使第13-15个原子升级可以在大撕裂之外购买，并且变得更强，费用变为原来的20000次方根。`,
            "51": `使质量获取速度的二重软上限弱化50%。`,
            "53": `使级别的元折算延迟1.5倍出现。`,
            "55": `使量子泡沫和死寂碎片获取速度乘以转生等级。`,
            "58": `使级别的所有折算弱化50%。`,
            "60": `转生质量与量子之前所有资源获取速度互相加成.`,
            "61": `转生质量的效果也可以对五重阶层和超新星次数元折算之前的所有折算生效.`,
            "62": `转生质量的效果也可以对转生等级的超级折算生效.`,
            "64": `转生等级对转生质量的获取速度公式的效果变得更强.`,
            "74": `荣耀对转生质量的获取速度公式的效果变得更强.`,
            "75": `转生质量的效果也可以对阶层元折算之前的所有折算生效.`,
            "77": `转生质量的效果也可以对级别元折算之前的所有折算和荣耀的超级折算生效.`,
            "79": `转生质量的效果也可以对宇宙弦元折算之前的所有折算生效.`,
            "80": "使质量获取速度的三重软上限弱化10%.",
            "82": "使质量获取速度的三重软上限弱化50%.",
            "88": `转生质量与蓝图粒子互相加成获取速度.`,
            "89": `转生质量与量子泡沫互相加成获取速度.`,
            "91": `Entropic Evaporation^2 is 20% weaker.`,
            "93": `转生质量的效果也可以对超新星的元折算生效.`,
            "98": `转生质量与死寂碎片获取速度互相加成.`,
            "99":  `使量子挑战5的削弱弱化8%.`,
            "100": `使蓝图粒子的效果变为原来的1.02次方.`,
            "101": `使W-玻色子的效果也对质量获取速度的三重到六重软上限生效.`,
            "102": `转生质量获取x10.2.`,
            "103": `转生等级对转生质量的获取速度公式的效果变得更强.`,
            "105": `使荣耀的超级折算弱化3%.`,
            "106": `转生等级对转生质量的获取速度公式的效果变得更强.`,
            "107": `使级别的元折算弱化99.99%.`,
            "110": `使转生质量获取速度基于质子数量的指数提升.`,
            "111": `使转生质量增加自身获取.`,
            "113": `使级别的元折算弱化90%.`,
            "115": `Entropic Evaporation^2 is 5% weaker.`,
            "129": `使挑战9到11的次数上限增加5000次.`,
            "130": `如果你购买了中子树升级[prim8],艾普西隆[E]粒子,西塔[Θ]粒子,贝塔[B]粒子基础等级获取变为每2.5个原基定理增加1级.`,
            "131": `Entropic Evaporation^2 is 5% weaker.`,
            "134": `使量子挑战2的削弱弱化3%.`,
            "135": `使转生等级提升荣耀9的效果.`,
            "140": `使W<sup>-</sup>玻色子的第一个效果也对质量获取速度的七重软上限生效.`,
            "141": `Entropic Evaporation^2 is 5% weaker.`,
            "165": `使转生等级加成无限质量获取.`,
            "250": `使转生等级加成永恒质量获取.`,
            "500": `转生质量的效果也可以对费米子阶层的超级折算生效.`,
            "1000": `转生质量的效果也可以对费米子阶层的究级折算生效.`,
        },
        {
            "1": `使所有星辰相关资源获取速度变为原来的2次方。`,
            "2": `使超新星的元折算延迟100次出现。`,
            "3": `使玻色子的加成基于转生基础值而增加。`,
            "4": `所有原基粒子获得5级免费等级。`,
            "5": `使五重阶层5的奖励基于转生基础值变得更强。`,
            "7": `使夸克获取速度基于荣耀的数值而增加。`,
            "9": `所有原基粒子获得等同于荣耀的免费等级。`,
            "10": `解锁转生质量。`,
            "11": `转生质量与熵获取速度互相加成.`,
            "12": `解锁辉煌。`,
            "13": `使挑战12的次数上限增加100次.`,
            "15": `使级别的所有折算弱化99.99%.`,
            "18": `使荣耀加成无限质量获取.`,
            "21": `转生质量的效果也可以对转生等级的究级折算生效.`,
            "22": `使荣耀9的效果翻倍.`,
            "23": `使荣耀加成铹(Lr103)的效果.`,
            "24": `移除坍缩星辰乘数效果的软上限，并使硬上限延迟至1e10次方出现.`,
            "25": `移除挑战1到挑战11的次数上限.`,
            "26": `使荣耀加成永恒质量获取.`,
            "27": `使六重阶层不重置任何东西.`,
            "28": `使量子挑战5的削弱弱化8%.`,
            "31": `转生等级对转生质量的获取速度公式的效果变得更强.`,
			"32": `转生质量的效果也可以对荣耀的究级折算生效.`,
			"33": `使荣耀加成加速器倍率.`,
			"34": `转生质量的效果也可以对六重阶层的超级折算生效.`,
			"35": `使宇宙弦的究极折算弱化20%.`,
			"37": `使三重阶层的究极折算弱化2%.`,
			"38": `使荣耀18的效果变为原来的4次方.`,
            "39": `使量子挑战5的削弱弱化5%.`,
            "43": `使转生等级135的效果变得更强.`,
			"44": `使荣耀26的效果变为原来的4次方.`,
			"56": `使六重阶层的究极折算弱化4.5%.`,
			"57": `使级别的元折算基于荣耀的数值而延迟.`,
			"58": `使阶层的元折算基于级别的数值而延迟.`,
			"60": `使荣耀57的效果变得更好`,
			"61": `转生质量的效果也可以对荣耀的超究折算生效.`,
			"62": `转生质量的效果也可以对六重阶层的究级折算生效.`,
			"63": `使五重阶层5效果的软上限弱化.`,
			"64": `转生质量的效果也可以对七重阶层的超级折算生效.`,
			"67": `转生质量的效果也可以对转生等级的元折算生效.`,
			"90": `星系能量的效果变得更强.`,
			"120": `使五重阶层的超极折算弱化60%.`,
			"122": `使挑战1到挑战20的硬化折算弱化10%.`,
			"136": `星系暗能量的效果变得更强.`,
			"146": `转生质量的效果也可以对七重阶层的究极折算生效,只是效果倍率降低.`,
			"242": `使荣耀加成星系夸克获取.`,
        },
		{
            "1": `使转生等级的超级折算延迟5次出现,自动获得转生等级.`,
            "2": `使荣耀的超级折算延迟1次出现,且荣耀不再重置任何东西. 使荣耀9的效果乘以辉煌.`,
            "3": `使辉煌加成无限质量获取.`,
            "4": `使辉煌加成永恒质量获取,以及辉煌3的效果平方.`,
            "5": `使辉煌加成熵获取.`,
            "6": `解锁七重阶层.`,
            "7": `使时间速度的元折算延迟至10000倍出现.`,
            "8": `转生质量的效果也可以对转生等级的超究折算生效.`,
            "10": `自动获得荣耀.`,
            "12": `转生质量的效果也可以对辉煌的超级折算生效.`,
            "13": `转生质量的效果也可以对费米子阶层的超究折算生效.`,
            "14": `使费米子阶层的元折算延迟至100倍出现.`,
            "17": `使挑战20的效果变得更好.`,
            "18": `七重阶层不再重置任何东西.`,
            "19": `使W<sup>-</sup>玻色子的第一个效果也对质量获取速度的溢出生效.`,
            "21": `使荣耀146效果增加10%`,
            "22": `使荣耀146效果增加30%`,
            "23": `使荣耀146效果增加50%`,
			"25": `转生质量的效果也可以对六重阶层的超究折算生效,只是效果倍率降低.`,
			"27": `辉煌5的效果基于辉煌变得更强.`,
            "29": `移除五重阶层的超级折算.`,
            "30": `解锁八重阶层.`,
            "31": `移除费米子阶层的超级折算.`,
            "33": `解锁名誉.`,
            "37": `移除质量升级的所有折算.`,
            "38": `解锁转生锻体器.`,
            "39": `解锁转生助推器.`,
            "40": `解锁转生强化器.`,
            "41": `使辉煌4,5的效果平方.`,
            "42": `使名誉加成永恒质量获取.`,
            "43": `移除转生等级的超级折算.`,
            "47": `移除费米子阶层的超究折算.`,
            "49": `使转生等级的元折算延迟至1.2倍出现.`,
            "51": `转生质量升级1的效果对自身生效.`,
            "52": `转生质量升级2的效果对自身生效.`,
            "53": `转生质量升级3的效果对自身生效.`,
            "54": `使辉煌25效果增加10%`,
            "55": `使辉煌25效果增加30%`,
            "56": `使辉煌25效果增加50%`,
			"57": `转生质量的效果也可以对六重阶层的元折算生效.`,
			"59": `转生质量的效果也可以对七重阶层的超究折算生效,只是效果倍率降低.`,
            "81": `使强化器的溢出弱化.`,
            "84": `使转生等级的元折算延迟至2倍出现.`,
            "98": `使辉煌的超究折算延迟6次出现.`,
            "140": `使辉煌59的效果增加5%`,
            "141": `使名誉加成奇异物质获取.`,
            "145": `移除六重阶层的究级折算.`,
            "146": `星系碎片加成量子次数.`,
            "147": `星系碎片加成无限次数.`,
            "148": `星系碎片加成永恒次数.`,
            "155": `使辉煌141的效果平方.`,
            "156": `使转生等级的元折算延迟至1.2倍出现.`,
            "162": `使降伏器的超级折算延迟至(10/9)倍出现.`,
            "163": `使五重阶层的元折算延迟至1e10倍出现.`,
            "165": `解锁转生时间速度.`,
            "173": `使辉煌25效果增加50%`,
            "175": `使五重阶层的元折算延迟至1e20倍出现.`,
		},
		{
            "1": `移除转生等级的究级折算.`,
            "2": `移除费米子阶层的究级折算.`,
            "3": `使荣耀9的效果乘以名誉.`,
            "4": `转生质量的效果也可以对辉煌的超究折算生效.`,
            "5": `使辉煌25效果增加5%`,
			"6": `转生质量的效果也可以对八重阶层的超级折算生效.`,
            "7": `使名誉3的效果平方.`,
            "8": `自动获得辉煌.`,
            "9": `八重阶层不再重置任何东西.`,
            "10": `大幅降低阶层的需求.`,
            "11": `使名誉加成转生质量升级3倍率.`,
            "12": `使名誉加成星系夸克获取.`,
            "13": `移除荣耀的超级折算.`,
            "17": `使名誉加成无限质量和永恒质量获取.`,
            "18": `使辉煌59的效果增加5%`,
            "19": `使超新星星系的超级折算延迟5次出现.`,
            "20": `移除七重阶层的超级折算.`,
            "21": `超新星星系加成奇异物质获取.`,
            "22": `名誉加成奇异物质获取.`,
            "23": `解锁飞升.`,
            "24": `转生质量升级1的效果对自身生效.`,
            "25": `移除六重阶层的超究折算.`,
            "26": `使费米子阶层的元折算延迟至10倍出现.`,
            "27": `名誉加成飞升基础值指数.`,
            "28": `转生质量升级2的效果对自身生效.`,
            "29": `使荣耀9的效果乘以转生等级.`,
            "30": `名誉加成转生质量获取公式.`,
            "31": `使辉煌59的效果增加5%`,
            "32": `使名誉21的效果平方.`,
			"33": `转生质量的效果也可以对名誉的超级折算生效.`,
			"34": `解锁转生黑洞.`,
			"35": `使黑洞压缩器的元折算基于暗物质的数值而延迟.`,
			"36": `使名誉3的效果^1.5.`,
			"37": `解锁转生暗物质.`,
			"38": `解锁九重阶层. 所有级别不会重置任何东西, 以及将级别,阶层,三重阶层显示在一起.`,
			"39": `转生暗物质的效果变得更强.`,
			"40": `超新星星系增幅熵获取的效果变得更强.`,
			"46": `移除八重阶层的超级折算.`,
            "48": `移除宇宙弦的超级折算.`,
            "49": `使辉煌25的效果增加50%`,
            "86": `使辉煌59的效果增加50%`,
		},
		{
			"1": `使六重阶层的元折算延迟至1000倍出现.`,
			"2": `使六重阶层的元折算延迟至10倍出现.`,
            "3": `使辉煌59的效果增加20%`,
            "4": `使英勇加成加成转生狂怒能量和转生暗物质获取.`,
            "5": `使转生等级的元折算延迟至2倍出现.`,
            "6": `移除转生等级的元折算,转生质量的效果也可以对转生等级的奇异折算生效 .`,
            "7": `使六重阶层的元折算延迟至1e10倍出现.`,
            "8": `使英勇加成暗射线获取.`,
            "9": `移除七重阶层的究级折算.`,
            "10": `降低阶层的需求.`,
            "11": "使转生等级的奇异折算基于英勇的数值而弱化.",
            "12": `使英勇加成雕文质量获取.`,
			"13": `转生质量的效果也可以对七重阶层的元折算生效,只是效果倍率降低.`,
			"14": `名誉24和28的效果变得更好.`,
            "15": `使英勇加成奇异物质获取.`,
            "16": `使英勇13的效果增加5%`,
            "17": `平方英勇12的效果.`,
            "18": `移除辉煌的超级折算.`,
            "20": `加速器效果的二重软上限弱化.`,
            "23": `移除八重阶层的超级折算.`,
            "26": `移除七重阶层的超究折算.`,
            "30": `英勇使转生质量获取公式变得更好.`,
            "34": `平方英勇15效果.`,
            "35": `降低六重阶层到八重阶层的需求`,
			"39": `名誉24和28的效果变得更好.`,
            "47": `从47英勇开始的每级英勇增加1%英勇13效果(上限90%).`,
            "51": `从51英勇开始的每级英勇使时间速度的元折算延迟至原来的平方.`,
			"57": `转生质量的效果也可以对辉煌的究极折算生效,只是效果倍率降低.`,
            "73": "英勇11的效果变得更强.",
            "74": "九重阶层14的效果变得更强.",
		},
    ],
    rewardEff: [
        {
            "8": [_=>{
                let x = player.prestiges[0].root(2).div(2).add(1)
                return x
            },x=>"延迟"+x.format()+"次方"],
            "10": [_=>{
                let x = Decimal.pow(2,player.prestiges[0])
                return x
            },x=>x.format()+"倍"],
            "32": [_=>{
                let x = player.prestiges[0].div(1e4)
				if(x.gte(30000))x = x.div(3).log10().mul(7500);
                return x
            },x=>"+"+format(x)+"次方"],
            "55": [_=>{
                let x = player.prestiges[0].max(1)
                return x
            },x=>x.format()+"倍"],
            "60": [_=>{
                return [player.prestigeMass.add(1),(tmp.preQUGlobalSpeed||E(0)).add(10).log10().sqrt()];
            },x=>"量子之前资源获取速度x"+x[0].format()+" 转生质量x"+x[1].format()],
            "88": [_=>{
                return [player.prestigeMass.add(1),(player.qu.bp||E(0)).add(10).log10().sqrt()];
            },x=>"蓝图粒子x"+x[0].format()+" 转生质量x"+x[1].format()],
            "89": [_=>{
                return [player.prestigeMass.add(1),(player.qu.points||E(0)).add(10).log10().sqrt()];
            },x=>"量子泡沫x"+x[0].format()+" 转生质量x"+x[1].format()],
            "98": [_=>{
                return [player.prestigeMass.add(10).log10().pow(2),(player.qu.rip.amt||E(0)).add(10).log10().sqrt()];
            },x=>"死寂碎片x"+x[0].format()+" 转生质量x"+x[1].format()],
			"110": [_=>{
                let x = player.atom.powers[0].add(1).log10().add(1).log10();
                return x
            },x=>x.format()+"x"],
			"111": [_=>{
                let x = player.prestigeMass.add(10).log10();
                return x
            },x=>x.format()+"x"],
			"135": [_=>{
                let x = player.prestiges[0].add(10).log10();
				if(hasPrestige(1,43))x = player.prestiges[0].add(1).pow(0.2);
                return x
            },x=>x.format()+"x"],
			"165": [_=>{
                let x = player.prestiges[0].add(1).log10().pow(1.5);
                return x
            },x=>x.format()+"x"],
			"250": [_=>{
                let x = player.prestiges[0].add(1).log10().pow(1.5);
                return x
            },x=>x.format()+"x"],
            /*
            "1": [_=>{
                let x = E(1)
                return x
            },x=>{
                return x.format()+"x"
            }],
            */
        },
        {
            "3": [_=>{
                let x = tmp.prestiges.base.max(1).log10().div(10).add(1).root(2)
                return x
            },x=>""+x.format()+"次方"],
            "5": [_=>{
                let x = tmp.prestiges.base.max(1).log10().div(10).add(1).root(3)
                return x
            },x=>""+x.format()+"倍"],
            "7": [_=>{
                let x = player.prestiges[1].add(1).root(3)
                return x
            },x=>""+x.format()+"次方"],
            "9": [_=>{
                let x = player.prestiges[1].max(1)
				if(hasPrestige(2,2))x = x.mul(player.prestiges[2].max(1));
				if(hasPrestige(0,135))x = x.mul(prestigeEff(0,135));
				if(hasPrestige(1,22))x = x.mul(2);
				if(hasElement(212))x = x.mul(2);
				if(hasElement(215))x = x.mul(2);
				if(hasPrestige(3,3))x = x.mul(prestigeEff(3,3));
				if(hasPrestige(3,29))x = x.mul(prestigeEff(3,29));
				if(hasAscension(0,80))x = x.mul(ascensionEff(0,80));
				if(hasAscension(0,170))x = x.pow(ascensionEff(0,170));
				if(hasChargedElement(212))x = x.pow(1.35);
				if(hasChargedElement(215))x = x.pow(1.05);
                return x
            },x=>"+"+x.format()],
            "11": [_=>{
                return [player.prestigeMass.add(1).sqrt(),player.qu.en.amt.add(10).log10().sqrt()];
            },x=>"熵获取x"+x[0].format()+" 转生质量x"+x[1].format()],
            "18": [_=>{
                let x = player.prestiges[1].add(1).root(4)
				if(hasPrestige(1,38))x = x.pow(4);
                return x
            },x=>"x"+x.format()],
            "23": [_=>{
                let x = player.prestiges[2].add(1).root(3)
                return x
            },x=>"^"+x.format()],
            "26": [_=>{
                let x = player.prestiges[1].add(1).root(4)
				if(hasPrestige(1,44))x = x.pow(4);
                return x
            },x=>"x"+x.format()],
            "33": [_=>{
                let x = player.prestiges[1].sub(30).div(10).add(1);
                return x
            },x=>"x"+x.format()],
            "57": [_=>{
                let x = E(2).pow(player.prestiges[1]);
				if(player.prestiges[1].gte(60))x = E(1.001).pow(player.prestiges[1].pow(3));
                return x
            },x=>"x"+x.format()],
            "58": [_=>{
                let x = player.ranks.rank.add(10).log10();
                return x
            },x=>"x"+x.format()],
            "146": [_=>{
                let x = 10;
				if (hasPrestige(2,21))x += 10;
				if (hasPrestige(2,22))x += 30;
				if (hasPrestige(2,23))x += 50;
                return x
            },x=>x+"% "],
            "242": [_=>{
                let x = player.prestiges[1].add(1).pow(4.2)
                return x
            },x=>"x"+x.format()],
        },
		{
            "3": [_=>{
                let x = player.prestiges[2].add(1).root(2)
				if (hasPrestige(2,4)) x = player.prestiges[2].add(1)
                return x
            },x=>"x"+x.format()],
            "4": [_=>{
                let x = player.prestiges[2].add(1).root(2)
				if (hasPrestige(2,41)) x = player.prestiges[2].add(1)
                return x
            },x=>"x"+x.format()],
            "5": [_=>{
                let x = E(2).pow(player.prestiges[1]).pow(player.prestiges[2].sub(25).max(1));
				if (hasPrestige(2,41)) x = x.pow(2)
                return x
            },x=>"x"+x.format()],
            "25": [_=>{
                let x = 5;
				if (hasPrestige(3,5))x += 5;
				if (hasPrestige(2,54))x += 10;
				if (hasPrestige(2,55))x += 30;
				if (hasPrestige(2,56))x += 50;
                return x
            },x=>x+"%"],
            "42": [_=>{
                let x = player.prestiges[3].add(1)
                return x
            },x=>"x"+x.format()],
            "51": [_=>{
                let x = player.prestigeMassUpg[1].add(1)
                return x
            },x=>"x"+x.format()+" "],
            "52": [_=>{
                let x = player.prestigeMassUpg[2].add(1)
                return x
            },x=>"x"+x.format()+" "],
            "53": [_=>{
                let x = player.prestigeMassUpg[2].add(1).log10().add(1).sqrt()
                return x
            },x=>"x"+x.format()+" "],
            "59": [_=>{
                let x = 5;
				if (hasPrestige(3,18))x += 5;
				if (hasPrestige(2,140))x += 5;
				if (hasPrestige(2,173))x += 5;
				if (hasPrestige(3,31))x += 5;
				if (hasPrestige(3,49))x += 5;
				if (hasPrestige(4,3))x += 20;
				if (hasPrestige(3,86))x += 50;
                return x
            },x=>x+"%"],
            "141": [_=>{
                let x = player.prestiges[2].div(100).add(1);
				if (hasPrestige(2,155))x = x.pow(2);
                return x
            },x=>"x"+x.format()],
            "146": [_=>{
                let x = player.gc.shard.add(1);
                return x
            },x=>"x"+x],
            "147": [_=>{
                let x = player.gc.shard.add(1);
                return x
            },x=>"x"+x],
            "148": [_=>{
                let x = player.gc.shard.add(1);
                return x
            },x=>"x"+x],
		},
		{
            "3": [_=>{
                let x = player.prestiges[3];
				if(x.gte(36))x = x.pow(1.5);
				if(x.gte(7))x = x.pow(2);
                return x
            },x=>"x"+x.format()],
            "11": [_=>{
                let x = player.prestiges[3].log10();
                return x
            },x=>"x"+x.format()+" "],
            "12": [_=>{
                let x = player.prestiges[3].add(1).pow(2);
                return x
            },x=>"x"+x.format()],
            "17": [_=>{
                let x = Decimal.pow(4,player.prestiges[3]);
                return x
            },x=>"x"+x.format()],
            "21": [_=>{
                let x = player.superGal.add(10).log10().pow(2);
				if(hasPrestige(3,32))x = x.pow(2);
                return x
            },x=>"x"+x.format()],
            "22": [_=>{
                let x = player.prestiges[3].div(10).add(1);
                return x
            },x=>"x"+x.format()],
            "24": [_=>{
                let x = player.prestigeMassUpg[1].add(10).log10().add(10).log10().add(10).log10();
				if(hasAscension(0,7))x = player.prestigeMassUpg[1].add(10).log10().add(10).log10().pow(0.5);
				if(hasPrestige(4,14))x = player.prestigeMassUpg[1].add(10).log10().add(10).log10();
				if(hasPrestige(4,39))x = player.prestigeMassUpg[1].add(10).log10().pow(0.5);
                return x
            },x=>"^"+x.format()],
            "27": [_=>{
                let x = player.prestiges[3].div(10000);
                return x
            },x=>"+"+x.format()],
            "28": [_=>{
                let x = player.prestigeMassUpg[2].add(10).log10().add(10).log10().add(10).log10();
				if(hasPrestige(4,14))x = player.prestigeMassUpg[2].add(10).log10().add(10).log10();
				if(hasPrestige(4,39))x = player.prestigeMassUpg[2].add(10).log10().pow(0.5);
                return x
            },x=>"^"+x.format()],
            "29": [_=>{
                let x = player.prestiges[0];
                return x
            },x=>"x"+x.format()],
            "35": [_=>{
                let x = player.bh.dm.add(1e10).log10().pow(0.5);
                return x
            },x=>"延迟"+x.format()+"倍出现"],
		},
		{
            "4": [_=>{
                let x = player.prestiges[4].add(1).pow(2);
                return x
            },x=>"x"+x.format()],
            "8": [_=>{
                let x = player.prestiges[4].add(1).pow(2);
                return x
            },x=>"x"+x.format()],
            "11": [_=>{
                let x = E(0.999).pow(player.prestiges[4]);
				if(hasPrestige(4,73))x = x.pow(2);
                return x
            },x=>"弱化"+formatReduction(x)],
            "12": [_=>{
                let x = player.prestiges[4].add(1);
				if(hasPrestige(4,17))x = x.pow(2);
                return x
            },x=>"x"+x.format()],
            "13": [_=>{
                let x = 5;
				if (hasPrestige(4,16))x += 5;
				if (hasPrestige(4,47))x += player.prestiges[4].sub(46).min(90).toNumber();
                return x
            },x=>x+"%"],
            "15": [_=>{
                let x = player.prestiges[4].add(1);
				if(hasPrestige(4,34))x = x.pow(2);
                return x
            },x=>"x"+x.format()],
            "51": [_=>{
                let x = E(2).pow(player.prestiges[4].sub(50).max(0));
                return x
            },x=>"延迟"+x.format()+"次方出现"],
            "57": [_=>{
                let x = 5;
                return x
            },x=>x+"%"],
		},
    ],
    reset(i) {
        if (i==0?tmp.prestiges.base.gte(tmp.prestiges.req[i]):player.prestiges[i-1].gte(tmp.prestiges.req[i])) {
            player.prestiges[i] = player.prestiges[i].add(1)

            if (!this.noReset[i]()) {
                for (let j = i-1; j >= 0; j--) {
                    player.prestiges[j] = E(0)
                }
                QUANTUM.enter(false,true,false,true)
            }
            
            updateRanksTemp()
        }
    },
}

const PRES_LEN = PRESTIGES.fullNames.length

function hasPrestige(x,y) { return player.prestiges[x].gte(y) }

function prestigeEff(x,y,def=E(1)) { return tmp.prestiges.eff[x][y] || def }


const ASCENSIONS = {
    fullNames: ["飞升等级","超越等级","轮回"],
    baseExponent() {
        let x = E(0)
        if (hasTree('qp42')) x = x.add(treeEff('qp42'));
		if(hasPrestige(3,27))x = x.add(prestigeEff(3,27,E(0)));
		if(hasAscension(0,10))x = x.add(ascensionEff(0,10,E(0)));
		if(hasElement(486))x = x.add(MATTERS.eff(8));
        return x.add(1)
    },
    base() {
        let x = E(1)

        for (let i = 0; i < PRESTIGES.fullNames.length; i++) {
            let r = player.prestiges[i]
            x = x.mul(r.add(1))
        }

        return x.sub(1)
    },
    req(i) {
        let x = EINF, y = player.ascensions[i]
        switch (i) {
            case 0:
                x = Decimal.pow(1.1,y.scaleEvery('ascension0').pow(1.1)).mul(1.5e12)
                break;
            case 1:
                x = y.scaleEvery('ascension1').pow(1.25).mul(3).add(4)
                break;
            case 2:
                x = y.scaleEvery('ascension2').pow(1.25).mul(3).add(20)
                break;
            default:
                x = EINF
                break;
        }
        return x.ceil()
    },
    bulk(i) {
        let x = E(0), y = i==0?tmp.ascensions.base:player.ascensions[i-1]
        switch (i) {
            case 0:
                if (y.gte(1.5e12)) x = y.div(1.5e12).max(1).log(1.1).max(0).root(1.1).scaleEvery('ascension0',true).add(1)
                break;
			case 1:
                if (y.gte(4)) x = y.sub(4).div(3).max(0).root(1.25).scaleEvery('ascension1',true).add(1)
                break
			case 2:
                if (y.gte(20)) x = y.sub(20).div(3).max(0).root(1.25).scaleEvery('ascension2',true).add(1)
                break
            default:
                x = E(0)
                break;
        }
        return x.floor()
    },
    unl: [
        _=>true,
        _=>hasAscension(0,4)||hasAscension(1,1),
        _=>hasAscension(1,20)||hasAscension(2,1),
    ],
    noReset: [
        _=>player.superCluster.gte(2),
        _=>player.superCluster.gte(11),
        _=>player.superCluster.gte(20),
    ],
    rewards: [
        {
			"1": `转生等级的元折算延迟至1.2倍出现.`,
			"2": `飞升等级加成奇异物质获取.`,
			"3": `星系粒子的效果变得更强.`,
			"4": `解锁超越.`,
			"5": `飞升等级2的效果^1.5`,
			"6": `飞升等级加成星系夸克获取.`,
			"7": `名誉24的效果变得更强.`,
            "8": `使超新星星系的超级折算延迟5次出现.`,
            "9": `飞升等级加成无限质量获取公式.`,
            "10": `飞升等级加成飞升基础值指数.`,
            "11": `飞升等级加成暗射线获取.`,
            "12": `飞升等级加成转生基础值指数.`,
            "13": `使飞升质量的效果翻倍.`,
            "14": `[G-中微子] 的效果变得更强.`,
            "15": `使飞升质量的效果翻倍.`,
            "16": `使飞升质量的效果翻倍.`,
            "18": `飞升等级9的效果x3.`,
			"19": `飞升等级2的效果^(4/3)`,
            "20": `飞升等级加成黑暗之影.`,
            "21": `转生质量的效果也可以对八重阶层的究极折算生效.`,
            "22": `移除熵压缩^2折算.`,
            "23": `挑战5的效果变得更强.`,
            "25": `平方飞升等级20的效果.`,
            "26": `黑洞压缩器和宇宙射线的免费等级效果从加法变为乘法.`,
            "28": `飞升等级对飞升质量的获取公式变得更好.`,
            "30": `解锁英勇 (一个新的声望阶层)`,
            "42": `熵消耗^2折算弱化20%.`,
            "49": `挑战17的效果也可以弱化转生质量效果的二重软上限,只是效果倍率降低.`,
            "60": `平方飞升等级6的效果.`,
            "65": `转生黑洞质量的效果变得更强.`,
			"80": `飞升等级加成荣耀9的效果.`,
            "87": `飞升质量的效果变得更强.`,
			"170": `飞升基础值指数也对荣耀9的效果生效.`,
        },
        {
			"1": `超越等级加成奇异物质获取.`,
			"2": `超越等级加成星系夸克获取.`,
			"3": `解锁飞升质量.`,
			"4": `解锁飞升质量升级1, 名誉的超级折算弱化20%.`,
			"5": `解锁飞升质量升级2.`,
			"6": `解锁飞升质量升级3.`,
			"7": `转生时间速度的倍率变为原来的5次方.`,
			"8": `奇异物质升级21的效果变得更强.`,
            "9": `飞升等级对飞升质量的获取公式变得更好.`,
			"10": `超越等级1的效果^1.6`,
            "11": `移除转生等级的超究折算.`,
            "12": `[G-缪中微子]的效果变得更强.`,
            "13": `移除荣耀的究级折算.`,
			"14": `超越等级加成雕文质量获取`,
			"15": `雕文质量获取公式变得更好.`,
			"16": `飞升质量升级1的效果对自身生效.`,
			"17": `超越等级 14的效果平方.`,
			"18": `飞升质量升级2的效果对自身生效.`,
			"19": `使超新星星系的需求/2.`,
			"20": `解锁轮回.`,
            "21": `熵消耗^2折算弱化20%.`,
            "25": `坍缩星辰的效果变得更强.`,
            "26": `降低九重阶层需求.`,
            "31": `弱化转生强化器的软上限.`,
            "32": `弱化转生强化器的软上限.`,
			"33": `转生时间速度的倍率变为原来的10次方.`,
			"34": `转生时间速度的倍率变为原来的5次方.`,
            "35": `弱化转生强化器的软上限.`,
			"36": `转生时间速度的倍率变为原来的5次方.`,
            "50": `超越等级18的效果变得更强.`,
            "146": `加速器效果的二重软上限弱化.`,
            "149": `飞升质量的效果x10`,
            "154": `弱化转生强化器的软上限.`,
            "160": `黑暗狂奔升级10的效果变得更强.`,
            "190": `黑暗狂奔升级10的效果变得更强.`,
            "200": `元素550的效果从40%更改为30%.`,
        },
		{
			"1": `质量和时间速度的免费等级效果从加法变为乘法.`,
            "2": `移除荣耀的超究折算.`,
            "3": `移除辉煌的究极折算.`,
            "4": `降低九重阶层需求.`,
            "5": `降低九重阶层需求.`,
            "6": `对飞升质量的获取公式变得更好.`,
            "7": `超越等级16的效果变得更强.`,
            "8": `移除名誉的超级折算.`,
			"9": `轮回加成转生时间速度的倍率.`,
			"10": `轮回加成星尘获取.`,
			"11": `轮回加成星系质量获取.`,
			"12": `荣耀的元折算延迟至2倍出现.`,
			"13": `荣耀的元折算延迟至2倍出现.`,
			"14": `荣耀的元折算延迟至2倍出现.`,
			"15": `轮回加成轴生成器的倍率.`,
			"16": `解锁飞升降伏器.`,
			"17": `荣耀的元折算延迟至2倍出现.`,
			"18": `荣耀的元折算延迟至2倍出现.`,
			"19": `六重阶层的元折算延迟至2次方出现`,
			"20": `移除荣耀的元折算.`,
			"21": `轮回15的效果平方.`,
			"22": `转生等级的奇异折算弱化25%.`,
            "23": `黑暗狂奔升级13的效果变得更强.`,
            "24": `九重阶层14的效果变得更强.`,
            "25": `星系粒子的效果变得更强.`,
            "26": `加速器效果的二重软上限弱化.`,
		},
    ],
    rewardEff: [
        {
            "2": [_=>{
                let x = player.ascensions[0].add(1);
				if(hasAscension(0,19))x = x.pow(4/3);
				if(hasAscension(0,5))x = x.pow(1.5);
                return x
            },x=>{
                return x.format()+"x"
            }],
            "6": [_=>{
                let x = player.ascensions[0].add(1);
				if(hasAscension(0,60))x = x.pow(2);
                return x
            },x=>{
                return x.format()+"x"
            }],
            "9": [_=>{
                let x = player.ascensions[0].div(60);
				if(hasAscension(0,18))x = x.mul(3);
                return x
            },x=>{
                return "+"+x.format()
            }],
            "10": [_=>{
                let x = player.ascensions[0].div(10000);
                return x
            },x=>"+"+x.format()],
            "11": [_=>{
                let x = player.ascensions[0].add(1);
                return x
            },x=>{
                return x.format()+"x"
            }],
            "12": [_=>{
                let x = player.ascensions[0];
                return x
            },x=>"+"+x.format()],
            "20": [_=>{
                let x = player.ascensions[0].add(1);
				if(hasAscension(0,25))x = x.pow(2);
                return x
            },x=>{
                return x.format()+"x"
            }],
            "49": [_=>{
                let x = Decimal.pow(0.99,player.chal.comps[17].pow(2).div(1e43).add(1).log10());
                return x
            },x=>"弱化"+format(E(1).sub(x).mul(100))+"%"],
            "80": [_=>{
                let x = player.ascensions[0].add(1).pow(3);
                return x
            },x=>{
                return x.format()+"x"
            }],
            "170": [_=>{
                let x = ASCENSIONS.baseExponent();
                return x
            },x=>{
                return "^"+x.format()
            }],
            /*
            "1": [_=>{
                let x = E(1)
                return x
            },x=>{
                return x.format()+"x"
            }],
            */
        },
        {
            "1": [_=>{
                let x = player.ascensions[1].add(1).pow(1.25);
				if(hasAscension(1,10))x = x.pow(1.6);
                return x
            },x=>{
                return x.format()+"x"
            }],
            "2": [_=>{
                let x = player.ascensions[1].add(1).pow(1.25);
                return x
            },x=>{
                return x.format()+"x"
            }],
            "14": [_=>{
                let x = player.ascensions[1].add(1);
				if(hasAscension(1,17))x = x.pow(2);
                return x
            },x=>{
                return x.format()+"x"
            }],
            "16": [_=>{
                let x = player.ascensionMassUpg[1].add(10).log10().add(10).log10();
				if(hasAscension(2,7))x = player.ascensionMassUpg[1].add(10).log10().pow(0.5);
                return x
            },x=>"^"+x.format()],
            "18": [_=>{
                let x = player.ascensionMassUpg[2].add(10).log10().add(10).log10();
				if(hasAscension(1,50))x = player.ascensionMassUpg[2].add(10).log10().pow(0.5);
                return x
            },x=>"^"+x.format()],
            /*
            "1": [_=>{
                let x = E(1)
                return x
            },x=>{
                return x.format()+"x"
            }],
            */
        },
		{
            "9": [_=>{
                let x = player.ascensions[2].add(1);
                return x
            },x=>{
                return "^"+x.format()
            }],
            "10": [_=>{
                let x = player.ascensions[2].add(1).pow(2);
                return x
            },x=>{
                return x.format()+"x"
            }],
            "11": [_=>{
                let x = player.ascensions[2].add(1).pow(2);
                return x
            },x=>{
                return x.format()+"x"
            }],
            "15": [_=>{
                let x = player.ascensions[2].add(1);
				if(hasAscension(2,21))x = x.pow(2);
                return x
            },x=>{
                return x.format()+"x"
            }],
		},
    ],
    reset(i) {
        if (i==0?tmp.ascensions.base.gte(tmp.ascensions.req[i]):player.ascensions[i-1].gte(tmp.ascensions.req[i])) {
            player.ascensions[i] = player.ascensions[i].add(1)

            if (!this.noReset[i]()) {
                for (let j = i-1; j >= 0; j--) {
                    player.ascensions[j] = E(0)
                }
                for (let j = PRES_LEN - 1; j >= 0; j--) {
                    player.prestiges[j] = E(0)
                }
                EXOTIC.doReset(true);
            }
            
            updateRanksTemp()
        }
    },
}

const AS_LEN = ASCENSIONS.fullNames.length

function hasPrestige(x,y) { return player.prestiges[x].gte(y) }

function prestigeEff(x,y,def=E(1)) { return tmp.prestiges.eff[x][y] || def }

function hasAscension(x,y) { return player.ascensions[x].gte(y) }

function ascensionEff(x,y,def=E(1)) { return tmp.ascensions.eff[x][y] || def }

function updateRanksTemp() {
    if (!tmp.ranks) tmp.ranks = {}
    for (let x = 0; x < RANKS.names.length; x++) if (!tmp.ranks[RANKS.names[x]]) tmp.ranks[RANKS.names[x]] = {}
    let fp2 = tmp.qu.chroma_eff[1]
    let fp = RANKS.fp.rank()
    tmp.ranks.rank.req = E(10).pow(player.ranks.rank.div(fp2).scaleEvery('rank').div(fp).pow(1.15)).mul(10)
    tmp.ranks.rank.bulk = E(0)
    if (player.mass.gte(10)) tmp.ranks.rank.bulk = player.mass.div(10).max(1).log10().root(1.15).mul(fp).scaleEvery('rank',true).mul(fp2).add(1).floor();
    tmp.ranks.rank.can = player.mass.gte(tmp.ranks.rank.req) && !CHALS.inChal(5) && !CHALS.inChal(10) && !CHALS.inChal(14) && !CHALS.inChal(19) && !FERMIONS.onActive("03")

    fp = RANKS.fp.tier()
    let pow = 2
	if (hasPrestige(3,10)) pow = 1.8
	if (hasChargedElement(9)) pow = 1.78
	if (hasChargedElement(44)) pow = 1.75
	if (hasPrestige(4,10)) pow = 1.5
    tmp.ranks.tier.req = player.ranks.tier.div(fp2).scaleEvery('tier').div(fp).add(2).pow(pow).floor()
    tmp.ranks.tier.bulk = player.ranks.rank.max(0).root(pow).sub(2).mul(fp).scaleEvery('tier',true).mul(fp2).add(1).floor();

    fp = E(1)
    pow = 2
    if (hasElement(44)) pow = 1.75
    if (player.ranks.hex.gte(44)) pow = 1.74
    if (hasChargedElement(72)) pow = 1.7
    if (hasChargedElement(74)) pow = 1.5
    if (hasElement(9)) fp = fp.mul(1/0.85)
    if (player.ranks.pent.gte(1)) fp = fp.mul(1/0.85)
    if (hasElement(72)) fp = fp.mul(1/0.85)
    if (player.ranks.hex.gte(9)) fp = fp.mul(1/0.85)
    if (player.ranks.hex.gte(72)) fp = fp.mul(1/0.85)
    if (player.ranks.hex.gte(72) && (player.qu.rip.active || player.ranks.hex.gte(100))) fp = fp.mul(1/0.85)
    tmp.ranks.tetr.req = player.ranks.tetr.div(fp2).scaleEvery('tetr').div(fp).pow(pow).mul(3).add(10).floor()
    tmp.ranks.tetr.bulk = player.ranks.tier.sub(10).div(3).max(0).root(pow).mul(fp).scaleEvery('tetr',true).mul(fp2).add(1).floor();

	fp2 = player.qu.times.gte("4.2e690")?fp2:hasElement(298)?tmp.elements.effect[298]:E(1)
    fp = E(1)
    pow = 1.5
    tmp.ranks.pent.req = player.ranks.pent.div(fp2).scaleEvery('pent').div(fp).pow(pow).add(15).floor()
    tmp.ranks.pent.bulk = player.ranks.tetr.sub(15).gte(0)?player.ranks.tetr.sub(15).max(0).root(pow).mul(fp).scaleEvery('pent',true).mul(fp2).add(1).floor():E(0);

    fp = E(1)
    pow = 1.5
    if (CHALS.inChal(25)) pow =3
    tmp.ranks.hex.req = player.ranks.hex.scaleEvery('hex').div(fp).pow(pow).add(25).floor() 
    tmp.ranks.hex.bulk = player.ranks.pent.sub(25).gte(0)?player.ranks.pent.sub(25).max(0).root(pow).mul(fp).scaleEvery('hex',true).add(1).floor():E(0);
 
    fp = E(0.1)
    if (CHALS.inChal(25)) fp =fp.div(2)
	if (hasElement(150)) fp = fp.mul(1.6)
	if(hasPrestige(4,35)) fp = fp.mul(1.25)
	if (hasChargedElement(150)) fp = fp.mul(2.5)
    pow = 1.5

    tmp.ranks.hept.req = player.ranks.hept.scaleEvery('hept').div(fp).pow(pow).add(hasPrestige(4,35)?100:200).floor()
    tmp.ranks.hept.bulk = player.ranks.hex.sub(hasPrestige(4,35)?100:200).gte(0)?player.ranks.hex.sub(hasPrestige(4,35)?100:200).max(0).root(pow).mul(fp).scaleEvery('hept',true).add(1).floor():E(0);

    fp = E(0.16)
    if (CHALS.inChal(25)) fp =fp.div(2)
	if(hasPrestige(4,35)) fp = fp.mul(1.25)
    pow = 1.5
    tmp.ranks.oct.req = player.ranks.oct.scaleEvery('oct').div(fp).pow(pow).add(hasPrestige(4,35)?100:200).floor()
    tmp.ranks.oct.bulk = player.ranks.hept.sub(hasPrestige(4,35)?100:200).gte(0)?player.ranks.hept.sub(hasPrestige(4,35)?100:200).max(0).root(pow).mul(fp).scaleEvery('oct',true).add(1).floor():E(0);

    fp = E(0.1)
    if (CHALS.inChal(25)) fp =fp.div(2)
	if(hasAscension(1,26)) fp = fp.mul(1.25)
	if(hasAscension(2,4)) fp = fp.mul(1.28)
	if(hasAscension(2,5)) fp = fp.mul(1.25)
    pow = 1.5
    tmp.ranks.enne.req = player.ranks.enne.scaleEvery('enne').div(fp).pow(pow).add(100).floor()
    tmp.ranks.enne.bulk = player.ranks.oct.sub(100).gte(0)?player.ranks.oct.sub(100).max(0).root(pow).mul(fp).scaleEvery('enne',true).add(1).floor():E(0);

    for (let x = 0; x < RANKS.names.length; x++) {
        let rn = RANKS.names[x]
        if (x > 0) {
            tmp.ranks[rn].can = player.ranks[RANKS.names[x-1]].gte(tmp.ranks[rn].req)
        }
    }

    // Prestige

    tmp.prestiges.baseMul = PRESTIGES.base()
    tmp.prestiges.baseExp = PRESTIGES.baseExponent()
    tmp.prestiges.base = tmp.prestiges.baseMul.pow(tmp.prestiges.baseExp)
    for (let x = 0; x < PRES_LEN; x++) {
        tmp.prestiges.req[x] = PRESTIGES.req(x)
        for (let y in PRESTIGES.rewardEff[x]) {
            if (PRESTIGES.rewardEff[x][y]) tmp.prestiges.eff[x][y] = PRESTIGES.rewardEff[x][y][0]()
        }
    }
   
	tmp.prestigeMassGain = prestigeMassGain()
	tmp.prestigeMassEffect = prestigeMassEffect()
	tmp.prestigeRPGain = prestigeRPGain()
	tmp.prestigeRPEffect = prestigeRPEffect()
	
	if(hasPrestige(2,1) || player.exotic.times.gte(2)){
		player.prestiges[0] = player.prestiges[0].max(PRESTIGES.bulk(0));
	}
	if(hasPrestige(2,10) || player.exotic.times.gte(2)){
		player.prestiges[1] = player.prestiges[1].max(PRESTIGES.bulk(1));
	}
	if(hasPrestige(3,8) || player.exotic.times.gte(2)){
		player.prestiges[2] = player.prestiges[2].max(PRESTIGES.bulk(2));
	}
	if(player.exotic.times.gte(2)){
		player.prestiges[3] = player.prestiges[3].max(PRESTIGES.bulk(3));
	}
	if(player.superCluster.gte(6)){
		player.prestiges[4] = player.prestiges[4].max(PRESTIGES.bulk(4));
	}
	
	
    // Ascension

    tmp.ascensions.baseMul = ASCENSIONS.base()
    tmp.ascensions.baseExp = ASCENSIONS.baseExponent()
    tmp.ascensions.base = tmp.ascensions.baseMul.pow(tmp.ascensions.baseExp)
    for (let x = 0; x < AS_LEN; x++) {
        tmp.ascensions.req[x] = ASCENSIONS.req(x)
        for (let y in ASCENSIONS.rewardEff[x]) {
            if (ASCENSIONS.rewardEff[x][y]) tmp.ascensions.eff[x][y] = ASCENSIONS.rewardEff[x][y][0]()
        }
    }
	
	if(player.superCluster.gte(5)){
		player.ascensions[0] = player.ascensions[0].max(ASCENSIONS.bulk(0));
	}
	if(player.superCluster.gte(12)){
		player.ascensions[1] = player.ascensions[1].max(ASCENSIONS.bulk(1));
	}
	if(player.superCluster.gte(20)){
		player.ascensions[2] = player.ascensions[2].max(ASCENSIONS.bulk(2));
	}
	
	tmp.prestigeMassGain = prestigeMassGain()
	tmp.prestigeMassEffect = prestigeMassEffect()
	tmp.prestigeRPGain = prestigeRPGain()
	tmp.prestigeRPEffect = prestigeRPEffect()
	tmp.prestigeBHGain = prestigeBHGain()
	tmp.prestigeBHEffect = prestigeBHEffect()
	tmp.prestigeDMGain = prestigeDMGain()
	tmp.prestigeDMEffect = prestigeDMEffect()
    tmp.prestigeATGain = prestigeATGain()
	tmp.prestigeATEffect = prestigeATEffect()
    tmp.prestigeQKGain  = prestigeQKGain()
    tmp.prestigeQKEffect = prestigeQKEffect()
    tmp.prestigeSTGain  = prestigeSTGain()
	tmp.ascensionMassGain = ascensionMassGain()
	tmp.ascensionMassEffect = ascensionMassEffect()
}

function updateRanksHTML() {
    tmp.el.rank_tabs.setDisplay(hasUpgrade('br',9))
    tmp.el.rank_tab2_btn.setDisplay(hasPrestige(3,23) || hasAscension(0,1))
    tmp.el.rank_tab3_btn.setDisplay(player.prestigeST.gte(1e6)|| player.sun.shard.gte(1))
    for (let x = 0; x < 4; x++) {
        tmp.el["rank_tab"+x].setDisplay(tmp.rank_tab == x)
    }

    if (tmp.rank_tab == 0) {
		if(player.ranks.enne.gte(100))tmp.el["ranks_div_2"].setDisplay(false),player.auto_ranks.tetr=player.auto_ranks.pent;
		if(hasPrestige(3,38))tmp.el["ranks_div_0"].setDisplay(false),player.auto_ranks.rank=player.auto_ranks.tetr;
		if(hasPrestige(3,38))tmp.el["ranks_div_1"].setDisplay(false),player.auto_ranks.tier=player.auto_ranks.tetr;
		tmp.el["ranks_name_2"].setDisplay(!hasPrestige(3,38));
		tmp.el["ranks_name_3"].setDisplay(!player.ranks.enne.gte(100));
        for (let x = player.ranks.enne.gte(100)?3:hasPrestige(3,38)?2:0; x < RANKS.names.length; x++) {
            let rn = RANKS.names[x]
            let unl = RANKS.unl[rn]?RANKS.unl[rn]():true
            tmp.el["ranks_div_"+x].setDisplay(unl)
            if (unl) {
                let keys = Object.keys(RANKS.desc[rn])
                let desc = ""
                for (let i = 0; i < keys.length; i++) {
                    if (player.ranks[rn].lt(keys[i])) {
                        desc = `在${RANKS.fullNames[x]}${format(keys[i],0)}，将${RANKS.desc[rn][keys[i]]}`
                        break
                    }
                }
    
                tmp.el["ranks_scale_"+x].setHTML(getScalingName(rn))
                tmp.el["ranks_amt_"+x].setHTML(format(player.ranks[rn],0))
                tmp.el["ranks_"+x].setClasses({btn: true, reset: true, locked: !tmp.ranks[rn].can})
                tmp.el["ranks_desc_"+x].setHTML(desc)
                tmp.el["ranks_desc1_"+x].setDisplay(!hasPrestige(3,38))
                tmp.el["ranks_req_"+x].setHTML(x==0?formatMass(tmp.ranks[rn].req):RANKS.fullNames[x-1]+" "+format(tmp.ranks[rn].req,0))
                tmp.el["ranks_auto_"+x].setDisplay(RANKS.autoUnl[rn]())
                tmp.el["ranks_auto_"+x].setHTML(player.auto_ranks[rn]?"ON":"OFF")
            }
        }
		if(hasPrestige(3,38))tmp.el.ranks_amt_2.setHTML("级别"+format(player.ranks.rank,0)+"<br>阶层"+format(player.ranks.tier,0)+"<br>三重阶层"+format(player.ranks.tetr,0));
		if(player.ranks.enne.gte(100)){
			tmp.el.ranks_amt_3.setHTML("级别"+format(player.ranks.rank,0)+"<br>阶层"+format(player.ranks.tier,0)+"<br>三重阶层"+format(player.ranks.tetr,0)+"<br>五重阶层"+format(player.ranks.pent,0));
			var html="<b>Current Beyond Ranks:</b><br>";
			for(let i=Math.max(9,getHighestBeyondRank()-1);i<=getHighestBeyondRank()+1;i++){
				html+=getRankTierName(i)+" "+format(beyondRankTier(i),0)+", to "+getRankTierName(i)+" up, requires "+getRankTierName(i-1)+" "+format(getNextBeyondRank(i),0)+(i>9?"(Enne "+format(getEnneforNextBeyondRank(i),0)+")":"")+"<br>";
			}
			tmp.el.beyond_ranks.setHTML(html);
		}else{
			tmp.el.beyond_ranks.setHTML('');
		}
    }else tmp.el.beyond_ranks.setHTML('');
    if (tmp.rank_tab == 1) {
        tmp.el.pres_base.setHTML(`${tmp.prestiges.baseMul.format(0)}<sup>${format(tmp.prestiges.baseExp)}</sup> = ${tmp.prestiges.base.format(0)}`)

        for (let x = 0; x < PRES_LEN; x++) {
            let unl = PRESTIGES.unl[x]?PRESTIGES.unl[x]():true

            tmp.el["pres_div_"+x].setDisplay(unl)

            if (unl) {
                let p = player.prestiges[x] || E(0)
                let keys = Object.keys(PRESTIGES.rewards[x])
                let desc = ""
                for (let i = 0; i < keys.length; i++) {
                    if (p.lt(keys[i])) {
                        desc = `在${PRESTIGES.fullNames[x]}${format(keys[i],0)}，将${PRESTIGES.rewards[x][keys[i]]}`
                        break
                    }
                }

                tmp.el["pres_scale_"+x].setHTML(getScalingName("prestige"+x))
                tmp.el["pres_amt_"+x].setHTML(format(p,0))
                tmp.el["pres_"+x].setClasses({btn: true, reset: true, locked: x==0?tmp.prestiges.base.lt(tmp.prestiges.req[x]):player.prestiges[x-1].lt(tmp.prestiges.req[x])})
                tmp.el["pres_desc_"+x].setHTML(desc)
                tmp.el["pres_req_"+x].setHTML(x==0?format(tmp.prestiges.req[x],0)+"转生基础值":PRESTIGES.fullNames[x-1]+" "+format(tmp.prestiges.req[x],0))
                tmp.el["pres_auto_"+x].setDisplay(false)
                tmp.el["pres_auto_"+x].setHTML(false?"ON":"OFF")
            }
        }
		
		if (player.prestiges[1].gte(10)){
			tmp.el["pres_mass"].setDisplay(true);
			tmp.el["pres_mass2"].setHTML(formatMass(player.prestigeMass,0)+" "+formatGain(player.prestigeMass, tmp.prestigeMassGain, true))
			tmp.el["pres_mass3"].setHTML(format(E(1).sub(prestigeMassEffect()).mul(100))+"%");
			tmp.el["pres_mass4"].setDisplay(hasPrestige(2,1));
		}else{
			tmp.el["pres_mass"].setDisplay(false);
		}
		
		if (player.prestiges[2].gte(165)){
			tmp.el["pres_rp"].setDisplay(true);
			tmp.el["pres_rp2"].setHTML(format(player.prestigeRP,0)+" "+formatGain(player.prestigeRP, tmp.prestigeRPGain))
			tmp.el["pres_rp3"].setHTML(format(prestigeRPEffect()));
		}else{
			tmp.el["pres_rp"].setDisplay(false);
		}
		
		if (player.prestiges[3].gte(34)){
			tmp.el["pres_bh"].setDisplay(true);
			tmp.el["pres_bh2"].setHTML(formatMass(player.prestigeBH)+" "+formatGain(player.prestigeBH, tmp.prestigeBHGain, true))
			tmp.el["pres_bh3"].setHTML(format(prestigeBHEffect()));
		}else{
			tmp.el["pres_bh"].setDisplay(false);
		}
		
		if (player.prestiges[3].gte(37)){
			tmp.el["pres_dm"].setDisplay(true);
			tmp.el["pres_dm2"].setHTML(format(player.prestigeDM,0)+" "+formatGain(player.prestigeDM, tmp.prestigeDMGain))
			tmp.el["pres_dm3"].setHTML(format(E(1).sub(prestigeDMEffect()).mul(100))+"%");
		}else{
			tmp.el["pres_dm"].setDisplay(false);
		}

		if (hasChargedElement(234)){
			tmp.el["pres_at"].setDisplay(true);
			tmp.el["pres_at2"].setHTML(format(player.prestigeAT,0)+" "+formatGain(player.prestigeAT, tmp.prestigeATGain))
			tmp.el["pres_at3"].setHTML(format(E(1).sub(prestigeATEffect()).mul(100))+"%");
		}else{
			tmp.el["pres_at"].setDisplay(false);
		}     
        if (hasChargedElement(251)&&player.exotic.boosts.reduce((acc, boost) => acc.add(boost)).gte(425) ){
			tmp.el["pres_qk"].setDisplay(true);
			tmp.el["pres_qk2"].setHTML(format(player.prestigeQK,0)+" "+formatGain(player.prestigeQK, tmp.prestigeQKGain))
			tmp.el["pres_qk3"].setHTML(format(prestigeQKEffect()));
		}else{
			tmp.el["pres_qk"].setDisplay(false);
		}      
        if (hasChargedElement(259)){
			tmp.el["pres_st"].setDisplay(true);
			tmp.el["pres_st2"].setHTML(format(player.prestigeST,0)+" "+formatGain(player.prestigeST, tmp.prestigeSTGain))
			
		}else{
			tmp.el["pres_st"].setDisplay(false);
		}        
    }
    if (tmp.rank_tab == 2) {
        tmp.el.as_base.setHTML(`${tmp.ascensions.baseMul.format(0)}<sup>${format(tmp.ascensions.baseExp)}</sup> = ${tmp.ascensions.base.format(0)}`)

        for (let x = 0; x < AS_LEN; x++) {
            let unl = ASCENSIONS.unl[x]?ASCENSIONS.unl[x]():true

            tmp.el["as_div_"+x].setDisplay(unl)

            if (unl) {
                let p = player.ascensions[x] || E(0)
                let keys = Object.keys(ASCENSIONS.rewards[x])
                let desc = ""
                for (let i = 0; i < keys.length; i++) {
                    if (p.lt(keys[i])) {
                        desc = ` At ${ASCENSIONS.fullNames[x]} ${format(keys[i],0)}, ${ASCENSIONS.rewards[x][keys[i]]}`
                        break
                    }
                }

                tmp.el["as_scale_"+x].setTxt(getScalingName("ascension"+x))
                tmp.el["as_amt_"+x].setHTML(format(p,0))
                tmp.el["as_"+x].setClasses({btn: true, reset: true, locked: x==0?tmp.ascensions.base.lt(tmp.ascensions.req[x]):player.ascensions[x-1].lt(tmp.ascensions.req[x])})
                tmp.el["as_desc_"+x].setHTML(desc)
                tmp.el["as_req_"+x].setHTML(x==0?format(tmp.ascensions.req[x],0)+"飞升基础值":ASCENSIONS.fullNames[x-1]+" "+format(tmp.ascensions.req[x],0))
                tmp.el["as_auto_"+x].setDisplay(false)
                tmp.el["as_auto_"+x].setHTML(false?"ON":"OFF")
            }
        }
		
		if (player.ascensions[1].gte(3)){
			tmp.el["as_mass"].setDisplay(true);
			tmp.el["as_mass2"].setHTML(formatMass(player.ascensionMass,0)+" "+formatGain(player.ascensionMass, tmp.ascensionMassGain, true))
			tmp.el["as_mass3"].setHTML(format(ascensionMassEffect()));
			tmp.el["as_mass4"].setDisplay(false);
		}else{
			tmp.el["as_mass"].setDisplay(false);
		}
		
    }
    if (tmp.rank_tab == 3) {


        for (let x = 0; x < AS_LEN; x++) {
            let unl = ASCENSIONS.unl[x]?ASCENSIONS.unl[x]():true

            tmp.el["as_div_"+x].setDisplay(unl)

            if (unl) {
                let p = player.ascensions[x] || E(0)
                let keys = Object.keys(ASCENSIONS.rewards[x])
                let desc = ""
                for (let i = 0; i < keys.length; i++) {
                    if (p.lt(keys[i])) {
                        desc = ` 在 ${ASCENSIONS.fullNames[x]} ${format(keys[i],0)}, ${ASCENSIONS.rewards[x][keys[i]]}`
                        break
                    }
                }

                tmp.el["as_scale_"+x].setTxt(getScalingName("ascension"+x))
                tmp.el["as_amt_"+x].setHTML(format(p,0))
                tmp.el["as_"+x].setClasses({btn: true, reset: true, locked: x==0?tmp.ascensions.base.lt(tmp.ascensions.req[x]):player.ascensions[x-1].lt(tmp.ascensions.req[x])})
                tmp.el["as_desc_"+x].setHTML(desc)
                tmp.el["as_req_"+x].setHTML(x==0?format(tmp.ascensions.req[x],0)+" of Ascension Base":ASCENSIONS.fullNames[x-1]+" "+format(tmp.ascensions.req[x],0))
                tmp.el["as_auto_"+x].setDisplay(false)
                tmp.el["as_auto_"+x].setHTML(false?"ON":"OFF")
            }
        }
		
		if (player.ascensions[1].gte(3)){
			tmp.el["as_mass"].setDisplay(true);
			tmp.el["as_mass2"].setHTML(formatMass(player.ascensionMass,0)+" "+formatGain(player.ascensionMass, tmp.ascensionMassGain, true))
			tmp.el["as_mass3"].setHTML(format(ascensionMassEffect()));
			tmp.el["as_mass4"].setDisplay(false);
		}else{
			tmp.el["as_mass"].setDisplay(false);
		}
		
    }
}

function prestigeMassGain(){
	if(player.prestiges[1].lt(10) || CHALS.inChal(16) || CHALS.inChal(19)){
		return E(0);
	}
	let p0pow = 1;
	if (hasPrestige(0,64)) p0pow += 0.5;
	if (hasPrestige(0,103)) p0pow += 0.25;
	if (hasPrestige(0,106)) p0pow += 0.1;
	if (hasPrestige(1,31)) p0pow += 0.15;
	let p1pow = 2;
	if (hasPrestige(0,74)) p1pow += 1;
	let p2pow = 1;
	let p3pow = 0;
	if (hasPrestige(3,30)) p3pow += 1;
	let p4pow = 0;
	if (hasPrestige(4,30)) p4pow += 1;
	
	let x= Decimal.log10(tmp.prestiges.base.add(10)).mul(player.prestiges[0].pow(p0pow)).mul(player.prestiges[1].pow(p1pow)).mul(player.prestiges[2].add(1).pow(p2pow)).mul(player.prestiges[3].add(1).pow(p3pow)).mul(player.prestiges[4].add(1).pow(p4pow)).pow(player.prestiges[1].div(10))
	if (hasPrestige(2,1)) x = x.pow(player.prestiges[2].div(10).add(1));
	if (hasPrestige(3,30)) x = x.pow(player.prestiges[3].div(29));
	if (hasPrestige(4,30)) x = x.pow(player.prestiges[4].div(29));
	if (hasChargedElement(145)) x = x.pow(1.1);
	x = x.div(400000);
	if (hasPrestige(0,60)) x = x.mul(prestigeEff(0,60,[E(1),E(1)])[1]);
	if (hasPrestige(1,11)) x = x.mul(prestigeEff(1,11,[E(1),E(1)])[1]);
    if (hasPrestige(0,88)) x = x.mul(prestigeEff(0,88,[E(1),E(1)])[1]);
    if (hasPrestige(0,89)) x = x.mul(prestigeEff(0,89,[E(1),E(1)])[1]);
    if (hasPrestige(0,98)) x = x.mul(prestigeEff(0,98,[E(1),E(1)])[1]);
    if (hasPrestige(0,102)) x = x.mul(10.2);
    if (player.md.break.upgs[11].gte(1)) x = x.mul(tmp.bd.upgs[11].eff||1)
    if (hasTree("pm1")) x = x.mul(tmp.supernova.tree_eff.pm1)
    if (hasTree("pm2")) x = x.mul(tmp.supernova.tree_eff.pm2)
    if (hasTree("qc7")) x = x.mul(tmp.supernova.tree_eff.qc7)
    if (hasPrestige(0,110)) x = x.mul(prestigeEff(0,110));
    if (hasPrestige(0,111)) x = x.mul(prestigeEff(0,111));
    if (hasUpgrade('inf',5)) x = x.mul(upgEffect(5,5))
	if (hasElement(145)) x = x.mul(10);
	if (hasElement(255)) x = x.mul(tmp.elements.effect[255]);
	if (hasElement(306)) x = x.mul(tmp.elements.effect[306]);
	x = x.mul(tmp.upgs.prestigeMass[1].eff.eff);
	if (player.prestiges[2].gte(165)) x = x.mul(tmp.prestigeTickspeedEffect.eff);
	x = x.mul(tmp.prestigeBHEffect||1);
    if (hasChargedElement(237)) x = x.mul(player.prestigeAT.add(1));
	return x;
}

function prestigeRPGain(){
	if(player.prestiges[2].lt(165)){
		return E(0);
	}
	let p = player.prestigeMass.add(1).log10().div(20).pow(0.5);
	let x = Decimal.pow(10,p);
	if(hasPrestige(4,4))x = x.mul(prestigeEff(4,4,E(1)));
    if (player.exotic.times.gte(200))x = x.mul(player.exotic.times.add(1));
    if (hasChargedElement(237)) x = x.mul(player.prestigeAT.add(1));
	return x;
}

function prestigeBHGain(){
	if(player.prestiges[3].lt(34)){
		return E(0);
	}
	let x = player.prestigeMass.add(1).log10().add(1).pow(2).mul(player.prestigeBH.add(1).pow(0.33));
	if (player.prestiges[3].gte(37)) x = x.mul(tmp.prestigeBHCEffect.eff);
    if (hasChargedElement(237)) x = x.mul(player.prestigeAT.add(1));
	return x;
}
function prestigeATGain(){
	if(!hasChargedElement(234)){
		return E(0);
	}
	let x =player.prestigeBH.add(1).log10().add(1).pow(2) ;
    if (player.ranks.enne.gte(19275)) x = x.mul(1000);
    if (hasChargedElement(257)&&player.prestigeBH.gte("1e15625")) x = x.mul(100);
	return x;
}
function prestigeQKGain(){
	if(!hasChargedElement(251)){
		return E(0);
	}
	let x =player.prestigeBH.add(1).log10().mul(player.prestigeAT.add(10).log10().pow(2)) ;
    if (hasChargedElement(257)&&player.prestigeBH.gte("1e15625")) x = x.mul(100);
	return x;
}
function prestigeSTGain(){
	if(!hasChargedElement(259)){
		return E(0);
	}
	let x =player.prestigeAT.add(1).log10().add(player.prestigeQK.add(10).log10()).div(2);
    if(hasUpgrade('st',3))x = x.mul.player.stellar.add(1).log10().pow(0.25)
	return x;
}
function prestigeMassEffect(){
	let p = player.prestigeMass.add(1).log10();
	if(p.gte(104))p = p.softcap(104,E(hasElement(152)?0.6:hasElement(135)?0.55:0.5).pow(hasElement(168)?tmp.chal.eff[16]:1),0);
	if(p.gte(145))p = p.softcap(145,E(0.3).pow(hasAscension(0,49)?ascensionEff(0,49,E(1)):1),0);
	if(p.gte(680))p = p.softcap(680,0.4,0);
	if(p.gte(1400))p = p.softcap(1400,0.1,0);
	if(hasTree("qu12"))return E(0.98).pow(p.pow(0.725));
	return E(0.965).pow(p.sqrt());
}

function prestigeRPEffect(){
	let p = player.prestigeRP.add(1).log10().div(1e5);
	return p;
}
function prestigeQKEffect(){
	let p = player.prestigeQK.add(1).log10().div(1e4).add(1);
	return p;
}
function prestigeBHEffect(){
	let p = overflow(player.prestigeBH.add(1),10,2.7);
	if(!hasAscension(0,65))p = overflow(p,Decimal.pow(10,1e5),0.33);
	return p;
}
function prestigeATEffect (){
	let p = 1-(player.prestigeAT.add(1).log10().mul(0.01));
    if(p>=0.1)p = 0.91-(player.prestigeAT.add(1).log10().mul(0.001));
	return p;
}
function prestigeDMGain(){
	if(player.prestiges[3].lt(37)){
		return E(0);
	}
	let p = player.prestigeRP.add(1).log10().div(20).pow(0.5).sub(3);
	let x = Decimal.pow(10,p);
	if (player.ranks.enne.gte(1)) x = x.mul(10);
	if(hasPrestige(4,4))x = x.mul(prestigeEff(4,4,E(1)));
    if (hasChargedElement(237)) x = x.mul(player.prestigeAT.add(1));
	return x;
}

function prestigeDMEffect(){
	let p = player.prestigeDM.add(1).log10();
	
	
	if(hasPrestige(3,39))p = p.mul(2);
	return E(0.995).pow(p.sqrt());
}

function calcPrestigeMass(dt){
	player.prestigeMass = player.prestigeMass.add(tmp.prestigeMassGain.mul(dt))
	player.prestigeRP = player.prestigeRP.add(tmp.prestigeRPGain.mul(dt))
	player.prestigeBH = player.prestigeBH.add(tmp.prestigeBHGain.mul(dt))
	player.ascensionMass = player.ascensionMass.add(tmp.ascensionMassGain.mul(dt))
	player.prestigeDM = player.prestigeDM.add(tmp.prestigeDMGain.mul(dt))
    player.prestigeAT = player.prestigeAT.add(tmp.prestigeATGain.mul(dt))
    player.prestigeQK = player.prestigeQK.add(tmp.prestigeQKGain.mul(dt))
    player.prestigeST = player.prestigeST.add(tmp.prestigeSTGain.mul(dt))
}

function ascensionMassGain(){
	if(player.ascensions[1].lt(3)){
		return E(0);
	}
	let a0pow = 1;
	if (hasAscension(0,28)) a0pow += 1;
	let a1pow = 2;
	if (hasAscension(1,9)) a1pow += 2;
	
	let x= Decimal.log10(tmp.ascensions.base.add(10)).mul(player.ascensions[0].pow(a0pow)).mul(player.ascensions[1].pow(a1pow)).pow(player.ascensions[1].div(10));
	if(hasAscension(2,6))x = x.pow(player.ascensions[2].div(5));
   
	x = x.mul(tmp.upgs.ascensionMass[1].eff.eff);
    if(hasTree("qp43"))x = x.pow(1.25);
	return x;
}

function ascensionMassEffect(){
	let p = player.ascensionMass.add(1).log10().softcap(300,0.5,0);
	if(hasAscension(0,87))p = p.pow(2);
	if(hasAscension(0,13))p = p.mul(2);
	if(hasAscension(0,15))p = p.mul(2);
	if(hasAscension(0,16))p = p.mul(2);
	if(hasAscension(1,149))p = p.mul(10);
	return p;
}


// beyond ranks


const RTNS = [
    ['','级别','阶层','四重阶层','五重阶层','六重阶层','七重阶层','八重阶层','九重阶层'],
]

function toChinese(e) {
  if ("" == (e = (e = e.toString().replace(/,/g, "")).replace(/^0+/, ""))) return "零";
  if (isNaN(e)) return "错误：不是数字";
  var r = "";
  e.length > 1 && (0 == e.indexOf("-") && (e = e.replace("-", ""), r = "负"), 0 == e.indexOf("+") && (e = e.replace("+", "")));
  var t, n, a, l, i, u, m, c, g, h, f, o = "",
    p = "",
    x = "undefined" == typeof maxDec || null == maxDec || Number(maxDec) < 0 || Number(maxDec) > 5;
  if ((n = e.split(".")).length > 1) {
    o = n[0], p = n[1], x && (maxDec = p.length > 5 ? 5 : p.length);
    var b = Number("0." + p);
    b *= Math.pow(10, maxDec), b = Math.round(Math.abs(b));
    var N = (b /= Math.pow(10, maxDec)).toString().split(".");
    1 == Number(N[0]) && (o = (Number(o) + 1).toString()), p = N.length > 1 ? N[1] : ""
  } else o = e, p = "", x && (maxDec = 0);
  if (o.length > 44) return "错误：数值过大！";
  if (a = new Array("零", "一", "二", "三", "四", "五", "六", "七", "八", "九"), l = new Array("", "十", "百", "千"), i = new Array("", "万", "亿", "兆", "京", "垓", "杼", "穰", "沟", "涧", "正"), t = "", Number(o) > 0)
    for (u = 0, m = 0; m < o.length; m++) h = (c = o.length - m - 1) / 4, f = c % 4, "0" == (g = o.substr(m, 1)) ? u++ : (u > 0 && (t += a[0]), u = 0, t += a[Number(g)] + l[f]), 0 == f && u < 4 && (t += i[h]);
  return (t = "" + r + t).replace(/一十/g, "十")
}

function getRankTierName(i) {
    if (i > 1e9) return +format(i,0,9,'sc')+'重阶层'
    else {
        if (i < 9) return RTNS[0][i]
        i += 1
	return `${toChinese(i)}重阶层`
    }
}

function beyondRankTier(x) {
	if(x <= 8)return player.ranks[RANKS.names[x-1]];
	if(player.ranks.enne.gte(E("e9e15").pow(Decimal.pow(1.5,x-8)))){
		return player.ranks.enne.root(Decimal.pow(1.5,x-8));
	}
	if(x == 9){
		if(player.ranks.enne.lt(100))return E(0);
		return player.ranks.enne.sub(100).max(0).root(1.5).div(5).add(1).floor();
	}
	let temp=beyondRankTier(x-1)
	if(temp.lt(100))return E(0);
	return temp.sub(100).max(0).root(1.5).div(5).add(1).floor();
}

function getNextBeyondRank(x) {
	return beyondRankTier(x).mul(5).pow(1.5).add(100).ceil();
}

function getHighestBeyondRank() {
	if(player.ranks.enne.lt(100))return 8;
	let x = 9;
	let step=1;
	while(beyondRankTier(x+step)>0){
		x+=step;
		step*=2;
	}
	while(step>=1){
		while(beyondRankTier(x+step)>0)x+=step;
		step/=2;
	}
	return x;
}

function getEnneforNextBeyondRank(x) {
	let y = beyondRankTier(x);
	while(x > 8){
		y = y.mul(5).pow(1.5).add(100).floor();
		x--;
		if(y.gte("e9e15")){
			return y.pow(Decimal.pow(1.5,x-8));
		}
	}
	return y;
}

function getEnneforBeyondRank(x) {
	let y = E(0);
	while(x > 8){
		y = y.mul(5).pow(1.5).add(100).floor();
		x--;
		if(y.gte("e9e15")){
			return y.pow(Decimal.pow(1.5,x-8));
		}
	}
	return y;
}
