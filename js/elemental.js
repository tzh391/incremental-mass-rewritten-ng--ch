const ELEMENTS = {
    map: [`x_________________xvxx___________xxxxxxvxx___________xxxxxxvxxx_xxxxxxxxxxxxxxxvxxx_xxxxxxxxxxxxxxxvxxx1xxxxxxxxxxxxxxxvxxx2xxxxxxxxxxxxxxxv_v___3xxxxxxxxxxxxxx_v___4xxxxxxxxxxxxxx_`],
    la: [null,'*','**','*','**'],
    exp: [0,118,218,362,558,814,1138],
    max_hsize: [19],
    names: [
        null,
        'H','He','Li','Be','B','C','N','O','F','Ne',
        'Na','Mg','Al','Si','P','S','Cl','Ar','K','Ca',
        'Sc','Ti','V','Cr','Mn','Fe','Co','Ni','Cu','Zn',
        'Ga','Ge','As','Se','Br','Kr','Rb','Sr','Y','Zr',
        'Nb','Mo','Tc','Ru','Rh','Pd','Ag','Cd','In','Sn',
        'Sb','Te','I','Xe','Cs','Ba','La','Ce','Pr','Nd',
        'Pm','Sm','Eu','Gd','Tb','Dy','Ho','Er','Tm','Yb',
        'Lu','Hf','Ta','W','Re','Os','Ir','Pt','Au','Hg',
        'Ti','Pb','Bi','Po','At','Rn','Fr','Ra','Ac','Th',
        'Pa','U','Np','Pu','Am','Cm','Bk','Cf','Es','Fm',
        'Md','No','Lr','Rf','Db','Sg','Bh','Hs','Mt','Ds',
        'Rg','Cn','Nh','Fl','Mc','Lv','Ts','Og'
    ],
    fullNames: [
        null,
        'Hydrogen','Helium','Lithium','Beryllium','Boron','Carbon','Nitrogen','Oxygen','Fluorine','Neon',
        'Sodium','Magnesium','Aluminium','Silicon','Phosphorus','Sulfur','Chlorine','Argon','Potassium','Calcium',
        'Scandium','Titanium','Vanadium','Chromium','Manganese','Iron','Cobalt','Nickel','Copper','Zinc',
        'Gallium','Germanium','Arsenic','Selenium','Bromine','Krypton','Rubidium','Strontium','Yttrium','Zirconium',
        'Niobium','Molybdenum','Technetium','Ruthenium','Rhodium','Palladium','Silver','Cadmium','Indium','Tin',
        'Antimony','Tellurium','Iodine','Xenon','Caesium','Barium','Lanthanum','Cerium','Praseodymium','Neodymium',
        'Promethium','Samarium','Europium','Gadolinium','Terbium','Dysprosium','Holmium','Erbium','Thulium','Ytterbium',
        'Lutetium','Hafnium','Tantalum','Tungsten','Rhenium','Osmium','Iridium','Platinum','Gold','Mercury',
        'Thallium','Lead','Bismuth','Polonium','Astatine','Radon','Francium','Radium','Actinium','Thorium',
        'Protactinium','Uranium','Neptunium','Plutonium','Americium','Curium','Berkelium','Californium','Einsteinium','Fermium',
        'Mendelevium','Nobelium','Lawrencium','Ruthefordium','Dubnium','Seaborgium','Bohrium','Hassium','Meitnerium','Darmstadium',
        'Roeritgenium','Copernicium','Nihonium','Flerovium','Moscovium','Livermorium','Tennessine','Oganesson'
    ],
    canBuy(x) { 
		if(this.upgs[x].qk)return player.atom.quarks.gte(this.upgs[x].cost) && !hasElement(x)
		if(this.upgs[x].exotic)return player.exotic.points.gte(this.upgs[x].cost) && !hasElement(x)
		if(this.upgs[x].ds)return player.exotic.ds.gte(this.upgs[x].cost) && !hasElement(x)
		if(this.upgs[x].galQk)return player.galQk.gte(this.upgs[x].cost) && !hasElement(x)
		if(this.upgs[x].et)return player.et.points.gte(this.upgs[x].cost) && !hasElement(x)
		if(x>118) return player.inf.points.gte(this.upgs[x].cost) && !hasElement(x)
		return player.atom.quarks.gte(this.upgs[x].cost) && !hasElement(x) && (player.qu.rip.active ? true : x <= 86) && !tmp.elements.cannot.includes(x)
	},
    canCharge(x) {
		if(!this.upgs[x].ccost)return false;
		if(x>118){
			if(this.upgs[x].et)return player.et.points.gte(this.upgs[x].ccost) && !hasChargedElement(x) && hasElement(483)
			return player.inf.points.gte(this.upgs[x].ccost) && !hasChargedElement(x) && hasElement(483)
		}
		return player.atom.quarks.gte(this.upgs[x].ccost) && !hasChargedElement(x) && hasElement(380)
	},
    buyUpg(x,y) {
        if (this.canBuy(x)) {
			if(x>118){
				if(this.upgs[x].qk)player.atom.quarks = player.atom.quarks.sub(this.upgs[x].cost)
				else if(this.upgs[x].exotic)player.exotic.points = player.exotic.points.sub(this.upgs[x].cost)
				else if(this.upgs[x].ds)player.exotic.ds = player.exotic.ds.sub(this.upgs[x].cost)
				else if(this.upgs[x].galQk)player.galQk = player.galQk.sub(this.upgs[x].cost)
				else if(this.upgs[x].et)player.et.points = player.et.points.sub(this.upgs[x].cost)
				else player.inf.points = player.inf.points.sub(this.upgs[x].cost)
			}else{
				player.atom.quarks = player.atom.quarks.sub(this.upgs[x].cost)
			}
            player.atom.elements.push(x)
        }
        if (this.canCharge(x) && !y) {
            player.atom.chargedElements.push(x)
        }
    },
    upgs: [
        null,
        {
            desc: `Improves quark gain formula is better.`,
            cost: E(5e8),
            cdesc: `夸克获取指数变为原来的1.01次方。`,
            ccost: E("ee2.7777e12"),
        },
        {
            desc: `Hardened Challenge scale 25% weaker.`,
            cost: E(2.5e12),
            cdesc: `使无望挑战的折算效果弱化5%。`,
            ccost: E("ee2.8e12"),
        },
        {
            desc: `Electron Power boost Atomic Powers gain.`,
            cost: E(1e15),
            effect() {
                let x = player.atom?player.atom.powers[2].add(1).root(2):E(1)
				if(player.ranks.hex.gte(3))x=x.pow(1.5);
				if(hasChargedElement(3))return x;
                if (x.gte('e1e4')) x = expMult(x.div('e1e4'),0.9).mul('e1e4')
				if (x.gte('ee4000')) x = overflow(x,'ee4000',0.5);
				if (x.gte('ee2250000')) x = overflow(x,'ee2250000',0.5);
				if (x.gte('ee7500000')) x = overflow(x,'ee7500000',0.5);
                return x
            },
            effDesc(x) { return format(x)+"x"+(x.gte('e1e4')&&!hasChargedElement(3)?" <span class='soft'>(softcapped)</span>":"") },
            cdesc: `去除该元素效果的所有软上限。`,
            ccost: E("ee2.9e12"),
        },
        {
            desc: `Stronger's power is stronger based on Proton Powers.`,
            cost: E(2.5e16),
            effect() {
                let x = player.atom?player.atom.powers[0].max(1).log10().pow(0.8).div(50).add(1):E(1)
				if(player.ranks.hex.gte(4))x=x.pow(1.05);
				if(hasChargedElement(4))x=x.pow(1.05);
				return x
            },
            effDesc(x) { return format(x)+"x stronger" },
            cdesc: `该元素效果变为原来的1.05次方。`,
            ccost: E("ee2.9e12"),
        },
        {
            desc: `The 7th challenge's effect is twice as effective.`,
            cost: E(1e18),
            cdesc: `挑战7的效果更好。`,
            ccost: E("ee3e12"),
        },
        {
            desc: `Gain 1% more quarks for each challenge completion.`,
            cost: E(5e18),
            effect() {
                let x = E(0)
                for (let i = 1; i <= CHALS.cols; i++) x = x.add(player.chal.comps[i].mul(i>4?2:1))
                if (hasElement(7)) x = x.mul(tmp.elements.effect[7])
                if (hasElement(87)) x = E(1.01).pow(x).root(3)
                else x = x.div(100).add(1).max(1)
                return x
            },
            effDesc(x) { return format(x)+"x" },
            cdesc: `该元素效果以降低的效果增加奇异物质获取。`,
            ccost: E("ee3.1e12"),
            ceffect() {
                let x = E(0)
                for (let i = 1; i <= CHALS.cols; i++) x = x.add(player.chal.comps[i].mul(i>4?2:1))
                if (hasElement(7)) x = x.mul(tmp.elements.effect[7])
                return x.add(10).log10().pow(hasChargedElement(87)?2:1);
            },
            ceffDesc(x) { return format(x)+"x" },
        },
        {
            desc: `Carbon's effect is now multiplied by the number of elements bought.`,
            cost: E(1e20),
            effect() {
                let x = E(player.atom.elements.length+1)
				if (player.ranks.hex.gte(7))x = x.pow(1.1);
                if (hasElement(11) && (!hasElement(87) || player.ranks.hex.gte(11))) x = x.pow(2);
                if (hasChargedElement(11)) x = x.pow(3);
				if (hasChargedElement(7))x = x.pow(tmp.elements.ceffect[7]||E(1));
                return x
            },
            effDesc(x) { return format(x)+"x" },
            cdesc: `Boost this element's effect based on the number of elements charged.`,
            ccost: E("ee3.2e12"),
            ceffect() {
                let x = E(player.atom.chargedElements.length+1)
                return x;
            },
            ceffDesc(x) { return "^"+format(x) },
        },
        {
            desc: `C2's reward's softcap is 75% weaker.`,
            cost: E(1e21),
            cdesc: `C13's reward's softcap starts later.`,
            ccost: E("ee3.2e12"),
        },
        {
            desc: `The Tetr requirement is 15% weaker.`,
            cost: E(6.5e21),
            cdesc: `The Tier requirement is broken.`,
            ccost: E("ee3.7e12"),
        },
        {
            desc: `使挑战3和挑战4的折算弱化。`,
            cost: E(1e24),
            cdesc: `C20 scaling is weakened.`,
            ccost: E("ee3.9e12"),
        },
        {
            desc: `Nitrogen's multiplier is squared.`,
            cost: E(1e27),
            cdesc: `Nitrogen's multiplier is cubed.`,
            ccost: E("ee4.65e12"),
        },
        {
            desc: `Power's gain from each particle formula is better.`,
            cost: E(1e29),
            cdesc: `这个元素的效果变得更好.`,
            ccost: E("ee4.65e12"),
        },
        {
            desc: `For every c7 completion, add 2 c5 & 6 completion.`,
            cost: E(2.5e30),
            effect() {
                let x = player.chal.comps[7].mul(2)
                if (hasElement(79)) x = x.mul(tmp.qu.chroma_eff[2])
                return x
            },
            effDesc(x) { return "+"+format(x) },
            cdesc: `The 7th challenge's 的效果变得更好`,
            ccost: E("ee4.8e12"),
        },
        {
            desc: `Passively gain 5% of the quarks you would get from resetting each second.`,
            cost: E(1e33),
            cdesc: `Passively gain 100% of the Dark Ray you would get from resetting each second.`,
            ccost: E("ee5e12"),
        },
        {
            desc: `Super BH Condenser & Cosmic Ray scales 20% weaker.`,
            cost: E(1e34),
            cdesc: `Remove Meta-Cosmic Ray scaling.`,
            ccost: E("ee5.2e12"),
        },
        {
            desc: `Silicon now gets +2% for each element bought.`,
            cost: E(5e38),
            effect() {
                let x = player.atom.elements.length*0.02
				if(player.ranks.hex.gte(16))x = player.atom.elements.length
                return Number(x)
            },
            effDesc(x) { return "+"+format(x*100)+"%" },
            cdesc: `This element's effect boost Silicon's Charged Effect.`,
            ccost: E("ee5.2e12"),
        },
        {
            desc: `Raise Atom's gain by 1.1.`,
            cost: E(1e40),
            cdesc: `Raise Atom's gain exponent by 1.01.`,
            ccost: E("ee5.3e12"),
        },
        {
            desc: `You can now automatically buy Cosmic Rays. Cosmic Ray raise tickspeed effect at an extremely reduced rate.`,
            cost: E(1e44),
            effect() {
                let x = player.atom.gamma_ray.pow(0.35).mul(0.01).add(1)
				if(player.ranks.hex.gte(18))x = player.atom.gamma_ray.add(1)
                return x
            },
            effDesc(x) { return "^"+format(x) },
            cdesc: `Argon's effect boost Normal Mass gain.`,
            ccost: E("ee5.4e12"),
        },
        {
            desc: `使中子的第2个效果变得更好.`,
            cost: E(1e50),
            cdesc: `2nd Neutron's effect is squared.`,
            ccost: E("ee5.75e12"),
        },
        {
            desc: `Adds 50 more C7 maximum completions.`,
            cost: E(1e53),
            cdesc: `The 7th challenge's 的效果变得更好`,
            ccost: E("ee5.9e12"),
        },
        {
            desc: `Unlock Mass Dilation.`,
            cost: E(1e56),
            cdesc: `Dilated Overflow is weaker.`,
            ccost: E("ee6e12"),
        },
        {
            desc: `Dilated mass gain is affected by tickspeed at a reduced rate.`,
            cost: E(1e61),
            effect() {
                let x = E(1.25).pow(player.tickspeed.pow(0.55))
				if(player.ranks.hex.gte(22))x = E(10).pow(player.tickspeed)
				if(hasChargedElement(22))x = E(10).pow(player.tickspeed.pow(1.25))
                return x.min('eee15')
            },
            effDesc(x) { return format(x)+"x"+(x.gte('eee15')?" <span class='soft'>(hardcapped)</span>":"")  },
            cdesc: `这个元素的效果变得更好.`,
            ccost: E("ee6.3e12"),
        },
        {
            desc: `使原子能量的效果变得更好.`,
            cost: E(1e65),
            cdesc: `这个元素的效果变得更好.`,
            ccost: E("ee6.9e12"),
        },
        {
            desc: `Passively gain 100% of the atoms you would get from resetting each second. Atomic Power boost Relativistic particles gain at a reduced rate.`,
            cost: E(1e75),
            effect() {
                let x = hasPrestige(0,40) ? player.atom.atomic.max(1).log10().add(1).log10().add(1).root(2) : player.atom.atomic.max(1).log10().add(1).pow(0.4)
				if(player.ranks.hex.gte(24))x = x.pow(1.1)
				return x
            },
            effDesc(x) { return hasPrestige(0,40) ? "^"+format(x) : format(x)+"x" },
            cdesc: `Passively gain 100% of the 奇异物质加成黑暗射线resetting each second.`,
            ccost: E("ee7.5e12"),
        },
        {
            desc: `Adds 1 base of Mass Dilation upgrade 1 effect.`,
            cost: E(1e80),
            cdesc: `Adds 1 base of Mass Dilation upgrade 3 effect.`,
            ccost: E("ee7.7e12"),
        },
        {
            desc: `Hardened Challenge scaling weaker for each element bought.`,
            cost: E(1e85),
            effect() {
                let x = E(0.99).pow(E(player.atom.elements.length).softcap(30,2/3,0)).max(0.5)
				if(player.ranks.hex.gte(26))x = E(0.99).pow(E(player.atom.elements.length))
                return x
            },
            effDesc(x) { return format(E(1).sub(x).mul(100))+"% weaker" },
            cdesc: `Impossible Challenge scaling weaker for each element charged.`,
            ccost: E("ee7.7e12"),
            ceffect() {
                let x = E(0.999).pow(E(player.atom.chargedElements.length))
                return x
            },
            ceffDesc(x) { return format(E(1).sub(x).mul(100))+"% weaker" },
        },
        {
            desc: `Hyper/Ultra Rank & Tickspeed scales 25% weaker.`,
            cost: E(1e90),
            cdesc: `Meta Tickspeed scales 99% weaker.`,
            ccost: E("ee8.8e12"),
        },
        {
            desc: `Mass gain is raised to the power of 1.5th if you dilated mass.`,
            cost: E(1e97),
            cdesc: `Dilated Mass boost Mass gain.`,
            ccost: E("ee8.9e12"),
            ceffect() {
                let x = player.md.mass.add(10).log10();
                return x
            },
            ceffDesc(x) { return "^"+format(x) },
        },
        {
            desc: `使质子能量的效果变得更好.`,
            cost: E(1e100),
            cdesc: `Proton powers effect is squared.`,
            ccost: E("ee9.3e12"),
        },
        {
            desc: `使电子能量的效果变得更好。自动获得每种粒子，数量为分配夸克时增加数量的10%.`,
            cost: E(1e107),
            cdesc: `Electron powers effect is squared.`,
            ccost: E("ee9.7e12"),
        },
        {
            desc: `Dilated mass boost Relativistic particles gain.`,
            cost: E(1e130),
            effect() {
                let x = player.md.mass.add(1).log10().add(1).log10().add(1).pow(5);
                return x
            },
            effDesc(x) { if(player.ranks.hex.gte(31))return "^"+format(x)+", "+format(player.md.mass.add(1).pow(0.0125))+"x";return format(player.md.mass.add(1).pow(0.0125))+"x" },
            cdesc: `Dilated mass boost Relativistic mass gain.`,
            ccost: E("ee1.1e13"),
            ceffect() {
                let x = player.md.mass.add(1).log10().add(1).log10().add(1).log10().add(1);
                return x
            },
            ceffDesc(x) { return "^"+format(x) },
        },
        {
            desc: `Increase dilated mass gain exponent by 5%.`,
            cost: E(1e140),
            cdesc: `Multiply dilated mass gain exponent by 10.`,
            ccost: E("ee1.5e13"),
        },
        {
            desc: `Add 50 more C8 maximum completions.`,
            cost: E(1e155),
            cdesc: `The effect of Challenge 8 is better.`,
            ccost: E("ee1.5e13"),
        },
        {
            desc: `Rage power boost Relativistic particles gain.`,
            cost: E(1e175),
            effect() {
                let x = player.rp.points.max(1).log10().add(1).pow(0.75)
                if(player.ranks.hex.gte(34))x = player.rp.points.add(1).log10().add(1).log10().add(1).log10().add(1);
                return x
            },
            effDesc(x) { if(player.ranks.hex.gte(34))return "^"+format(x);return format(x)+"x" },
            cdesc: `This element's effect boost Relativistic mass gain.`,
            ccost: E("ee1.6e13"),
            ceffect() {
                let x = player.rp.points.add(1).log10().add(1).log10().add(1).log10().add(1);
                return x
            },
            ceffDesc(x) { return "^"+format(x) },
        },
        {
            desc: `Mass from Black Hole boost dilated mass gain.`,
            cost: E(1e210),
            effect() {
                let x = player.bh.mass.max(1).log10().add(1).pow(0.8)
				if(player.ranks.hex.gte(35))x = player.bh.mass.add(1).log10().add(1).log10().add(1).log10().add(1).sqrt();
                return x
            },
            effDesc(x) { if(player.ranks.hex.gte(35))return "^"+format(x);return format(x)+"x" },
            cdesc: `This element's effect boost Relativistic mass gain.`,
            ccost: E("ee1.6e13"),
            ceffect() {
                let x = player.bh.mass.add(1).log10().add(1).log10().add(1).log10().add(1).sqrt();
                return x
            },
            ceffDesc(x) { return "^"+format(x) },
        },
        {
            desc: `Unlock Stars.`,
            cost: E(1e225),
            cdesc: `Collapsed Star gain exponent ^1.1`,
            ccost: E("ee1.6e13"),
        },
        {
            desc: `Super Tier scale weaker based on Tetr.`,
            cost: E(1e245),
            effect() {
				if(player.ranks.hex.gte(37))return E(0);
                let x = E(0.9).pow(player.ranks.tetr.softcap(6,0.5,0))
                return x
            },
            effDesc(x) { return format(E(1).sub(x).mul(100))+"% weaker" },
            cdesc: `Meta-Hex scale weaker based on Tetr.`,
            ccost: E("ee2.6e13"),
            ceffect() {
                let x = E(0.9).pow(player.ranks.tetr.add(1).log10().add(1).log10().add(1).log10());
                return x
            },
            ceffDesc(x) { return format(E(1).sub(x).mul(100))+"% weaker" },
        },
        {
            desc: `Cosmic Ray's free tickspeeds now adds to RU7.`,
            cost: E(1e260),
            effect() {
                let x = tmp.atom?tmp.atom.atomicEff:E(0)
                if (hasElement(82)) x = x.mul(3)
                if (player.ranks.hex.gte(38)) x = x.mul(2)
				if (hasChargedElement(82))return x.pow(2)
                return x.div(6).floor()
            },
            effDesc(x) { return "+"+format(x,0)+" to Rage Power Upgrade 7" },
            cdesc: `Cosmic Ray's free tickspeeds now adds to BH Condensers.`,
            ccost: E("ee2.7e13"),
        },
        {
            desc: `Remove softcap from C2 & C6 effects.`,
            cost: E(1e285),
            cdesc: `C13 effect softcap starts later.`,
            ccost: E("ee2.7e13"),
        },
        {
            desc: `Collapsed star boost dilated mass gain.`,
            cost: E(1e303),
            effect() {
                let x = player.stars.points.add(1).pow(0.5)
                if (player.ranks.hex.gte(40)) x = x.pow(2)
                return x.min('ee3e13')
            },
            effDesc(x) { return format(x)+"x"+(x.gte('ee3e13')?" <span class='soft'>(hardcapped)</span>":"") },
            cdesc: `Collapsed star boost Relativistic mass gain.`,
            ccost: E("ee3e13"),
            ceffect() {
                let x = player.stars.points.add(1).log10().add(1).log10().add(1).log10().add(1);
                return x
            },
            ceffDesc(x) { return "^"+format(x) },
        },
        {
            desc: `Add 50 more C7 maximum completions.`,
            cost: E('e315'),
            cdesc: `The 7th challenge's 的效果变得更好`,
            ccost: E("ee3.1e13"),
        },
        {
            desc: `Collapsed star boost quark gain.`,
            cost: E('e325'),
            effect() {
				if(hasChargedElement(42))return Decimal.pow(10,expMult(player.stars.points.add(1).log10().add(1).log10().add(2),0.96));
                let x = player.stars.points.add(1).pow(1/3)
                if (player.ranks.hex.gte(42)) x = x.pow(3)
                return x.min('eee10')
            },
            effDesc(x) { 
				if(hasChargedElement(42))return "^"+format(x);
				return format(x)+"x"+(x.gte('eee10')?" <span class='soft'>(hardcapped)</span>":"") 
			},
            cdesc: `这个元素的效果变得更好`,
            ccost: E("ee3.2e13"),
        },
        {
            desc: `You can now automatically buy mass dilation upgrades if you purchased any first. They no longer spent dilated mass.`,
            cost: E('e360'),
            cdesc: `You can now automatically buy Reset Count Boosters. They no longer spent Exotic Matter.`,
            ccost: E("ee3.3e13"),
        },
        {
            desc: `The Tetr requirement is broken.`,
            cost: E('e380'),
            cdesc: `The Tier requirement is broken.`,
            ccost: E('ee3.4e13'),
        },
        {
            desc: `Collapsed star boost relativistic particles gain.`,
            cost: E('e420'),
            effect() {
                let x = player.stars.points.add(1).pow(0.15).min(1e20)
				if(player.ranks.hex.gte(45))x = player.stars.points.add(1).log10().add(1).log10().add(1).log10().add(1).sqrt();
                return x
            },
            effDesc(x) { if(player.ranks.hex.gte(45))return "^"+format(x);return format(x)+"x" },
            cdesc: `This element's effect boost Relativistic Energy gain.`,
            ccost: E('ee3.5e13'),
            ceffect() {
                let x = player.stars.points.add(1).log10().add(1).log10().add(1).log10().add(1).sqrt();
                return x
            },
            ceffDesc(x) { return "^"+format(x) },
        },
        {
            desc: `Collapsed star's effect boost mass gain from the black hole at a reduced rate.`,
            cost: E('e510'),
            effect() {
                let x = tmp.stars?tmp.stars.effect.add(1).pow(0.02):E(1)
				if(player.ranks.hex.gte(46))x = tmp.stars?tmp.stars.effectPower:E(1)
                return x
            },
            effDesc(x) { if(player.ranks.hex.gte(46))return "^"+format(x);return format(x)+"x" },
            cdesc: `Collapsed star's 的效果变得更好.`,
            ccost: E('ee3.6e13'),
        },
        {
            desc: `使夸克获取速度变为原来的1.1次方.`,
            cost: E('e610'),
            cdesc: `Quarks gain exponent ^1.02`,
            ccost: E('ee3.6e13'),
        },
        {
            desc: `Collapsed stars effect is 10% stronger.`,
            cost: E('e800'),
            cdesc: `Collapsed star's 的效果变得更好.`,
            ccost: E('ee3.8e13'),
        },
        {
            desc: `Collapsed star boost last type of stars.`,
            cost: E('e1000'),
            effect() {
                let x = player.stars.points.add(1).log10().add(1).pow(1.1)
				if(player.ranks.hex.gte(49))x = player.stars.points
				x = overflow(x,"ee40000",0.75).min('eee10');
                return x
            },
            effDesc(x) { return format(x)+"x"+(x.gte('eee10')?" <span class='soft'>(hardcapped)</span>":x.gte('ee40000')?" <span class='soft'>(softcapped)</span>":"") },
            cdesc: `Star generator gain exponent ^1.02`,
            ccost: E("ee4.7e13"),
        },
        {
            desc: `Star generator is now ^1.05 stronger.`,
            cost: E('e1750'),
            cdesc: `Star generator gain exponent ^1.02`,
            ccost: E("ee5.3e13"),
        },
        {
            desc: `Mass gain softcap^2 is 10% weaker.`,
            cost: E('e2400'),
            cdesc: `Mass gain exponent ^1.005`,
            ccost: E("ee5.4e13"),
        },
        {
            desc: `Mass of black hole boost atomic powers gain at a reduced rate.`,
            cost: E('e2800'),
            effect() {
				if(hasChargedElement(52))return Decimal.pow(10,player.bh.mass.add(1).log10().add(1).log10().add(2));
                let x = expMult(player.bh.mass.add(1),0.6).min('eee10')
				if(player.ranks.hex.gte(52))x = expMult(player.bh.mass.add(1),0.95).min('eee10')
                return x
            },
            effDesc(x) { 
				if(hasChargedElement(52))return "^"+format(x);
					return format(x)+"x"+(x.gte('eee10')?" <span class='soft'>(hardcapped)</span>":"") },
            cdesc: `这个元素的效果变得更好`,
            ccost: E("ee5.5e13"),
        },
        {
            desc: `Mass Dilation upgrade 6 is 75% stronger.`,
            cost: E('e4600'),
            cdesc: `Remove the softcap of Break Dilation upgrade 1.`,
            ccost: E("ee5.7e13"),
        },
        {
            desc: `使质量可以加成所有星辰相关资源，只是效果倍率降低.`,
            cost: E('e5200'),
            effect() {
				if(hasChargedElement(54))return E(10).tetrate(player.mass.add(10).slog().div(1.35));
                let x = player.mass.max(1).log10().root(2)
                return x
            },
            effDesc(x) { 
				if(hasChargedElement(54))return "^"+format(x);
			return format(x)+"x" },
            cdesc: `这个元素的效果变得更好`,
            ccost: E("ee5.8e13"),
        },
        {
            desc: `Hyper/Ultra BH Condenser & Cosmic Ray scale 25% weaker.`,
            cost: E('e1.6e4'),
            cdesc: `Remove Meta-BH Condenser scaling.`,
            ccost: E("ee5.9e13"),
        },
        {
            desc: `Add 200 more C8 maximum completions.`,
            cost: E('e2.2e4'),
            cdesc: `The effect of C8 is better.`,
            ccost: E("ee9.9e13"),
        },
        {
            desc: `Tickspeed power boost base from Star Booster at a reduced rate.`,
            cost: E('e3.6e4'),
            effect() {
                let x = tmp.tickspeedEffect?tmp.tickspeedEffect.step.max(1).log10().div(10).max(1):E(1)
				if (hasChargedElement(57))x = tmp.tickspeedEffect?E(10).tetrate(tmp.tickspeedEffect.step.add(10).slog().div(hasChargedElement(66)?1.0036:1.00369)):E(1)
                if (hasElement(66)) x = x.pow(2)
                if (player.ranks.hex.gte(57)) x = x.pow(1.1)
                if (player.ranks.hex.gte(66)) x = x.pow(1.1)
                return x
            },
            effDesc(x) { return format(x)+"x" },
            cdesc: `这个元素的效果变得更好`,
            ccost: E("ee1e14"),
        },
        {
            desc: `Ultra Rank & Tickspeed scales weaker based on Tier.`,
            cost: E('e5.7e4'),
            effect() {
				if(player.ranks.hex.gte(58))return E(0);
                let x = E(0.975).pow(player.ranks.tier.pow(0.5))
                return x
            },
            effDesc(x) { return format(E(1).sub(x).mul(100))+"% weaker" },
            cdesc: `Meta-Hex scales weaker based on Tier.`,
            ccost: E("ee1.7e14"),
            ceffect() {
                let x = E(0.9).pow(player.ranks.tier.add(1).log10().add(1).log10().add(1).log10());
                return x
            },
            ceffDesc(x) { return format(E(1).sub(x).mul(100))+"% weaker" },
        },
        {
            desc: `The power from the mass of the BH formula is increased to 0.45.`,
            cost: E('e6.6e4'),
            cdesc: `The power from the mass of the BH formula is increased to 1, and uncap Radiation Booster "BH-Exponent Boost".`,
            ccost: E("ee1.8e14"),
        },
        {
            desc: `Add 100 more C7 maximum completions.`,
            cost: E('e7.7e4'),
            cdesc: `C7 reward is better`,
            ccost: E("ee1.9e14"),
        },
        {
            desc: `Multiply Particle Powers gain by ^0.5 of its Particle's amount after softcap.`,
            cost: E('e1.5e5'),
            cdesc: `Remove Particle Powers gain softcaps.`,
            ccost: E("ee2e14"),
        },
        {
            desc: `Ultra Rank scale 3 later for every Supernova.`,
            cost: E('e2.5e5'),
            effect() {
                let x = player.supernova.times.mul(3)
                return x
            },
            effDesc(x) { return format(x,0)+" later" },
            cdesc: `Meta-Pent starts later based on Supernova.`,
            ccost: E("ee2.1e14"),
            ceffect() {
                let x = player.supernova.times.add(10).pow(2)
                return x
            },
            ceffDesc(x) { return "x"+format(x,0)+" later" },
        },
        {
            desc: `Non-bonus Tickspeed is 25x effective.`,
            cost: E('e3e5'),
            cdesc: `Accelerator Effect Softcap^2 is weaker.`,
            ccost: E("ee3.1e14"),
        },
        {
            desc: `Rewards from Challenges 3-4 & 8 are 50% effective.`,
            cost: E('e5e5'),
            cdesc: `C3-4 Rewards 变得更好`,
            ccost: E("ee3.4e14"),
        },
        {
            desc: `Add 200 more C7 & c8 maximum completions.`,
            cost: E('e8e5'),
            cdesc: `C7-8 Rewards 变得更好`,
            ccost: E("ee3.7e14"),
        },
        {
            desc: `Lanthanum's effect is twice stronger.`,
            cost: E('e1.1e6'),
            cdesc: `Lanthanum's 的效果变得更好`,
            ccost: E("ee4.4e14"),
        },
        {
            desc: `Collapsed star boost quarks gain.`,
            cost: E('e1.7e6'),
            effect() {
				if(hasChargedElement(67)) return E(10).tetrate(player.stars.points.add(100).slog().div(1.337));
                let x = player.stars.points.add(1)
                if (player.ranks.hex.gte(67)) return player.stars.points.add(1).log10().add(1).log10().add(1).log10().add(1).sqrt();
                return x.softcap('e3e15',0.85,2).min('eee10')
            },
            effDesc(x) { if(player.ranks.hex.gte(67) || hasChargedElement(67))return "^"+format(x);return format(x)+"x"+(x.gte('eee10')?" <span class='soft'>(hardcapped)</span>":"")  },
            cdesc: `这个元素的效果变得更好`,
            ccost: E("ee4.5e14"),
        },
        {
            desc: `Meta-Tickspeed start 2x later.`,
            cost: E('e4.8e6'),
            cdesc: `Meta-Tickspeed start ^2 later.`,
            ccost: E('ee5e14'),
        },
        {
            desc: `Pent is now added in mass gain formula from collapsed stars.`,
            cost: E('e3.6e7'),
            cdesc: `Hept is now added in mass gain formula from collapsed stars.`,
            ccost: E('ee5.4e14'),
        },
        {
            desc: `Add 200 more C7 & c8 maximum completions.`,
            cost: E('e6.9e7'),
            cdesc: `C7-8 Rewards 变得更好`,
            ccost: E('ee6.1e14'),
        },
        {
            desc: `From BH the formulas softcap starts later based on Supernovas.`,
            cost: E('e1.6e8'),
            effect() {
                let x = player.supernova.times.add(1).root(4)
                return x
            },
            effDesc(x) { return "^"+format(x)+" later" },
            cdesc: `Black Hole Upgrade 19 is better.`,
            ccost: E('ee6.2e14'),
        },
        {
            desc: `Tetrs are 15% cheaper.`,
            cost: E('e5.75e8'),
            cdesc: `The Tetr requirement is broken.`,
            ccost: E('ee9e14'),
        },
        {
            desc: `Add more C5-6 & C8 maximum completions based on Supernovas.`,
            cost: E('e1.3e9'),
            effect() {
                let x = player.supernova.times.mul(5)
                if (hasElement(79)) x = x.mul(tmp.qu.chroma_eff[2])
                return x
            },
            effDesc(x) { return "+"+format(x,0) },
            cdesc: `Effects of C5,C8 变得更好.`,
            ccost: E('ee9.5e14'),
        },
        {
            desc: `Super Tetr scales 25% weaker.`,
            cost: E('e2.6e9'),
            cdesc: `The Tetr requirement is broken.`,
            ccost: E('ee1.2e15'),
        },
        {
            desc: `Remove 2 softcaps from Atomic Power's effect.`,
            cost: E('e3.9e9'),
            cdesc: `Atomic Power's 的效果变得更好.`,
            ccost: E('ee1.3e15'),
        },
        {
            desc: `Collapsed Star's effect is 25% stronger.`,
            cost: E('e3.75e10'),
            cdesc: `Collapsed Star's 的效果变得更好.`,
            ccost: E('ee1.4e15'),
        },
        {
            desc: `Softcap^3 from mass gain is 17.5% weaker.`,
            cost: E('e4e11'),
            cdesc: `使强化器的溢出弱化.`,
            ccost: E('ee1.9e15'),
        },
        {
            desc: `Meta-Supernova scales 20% weaker.`,
            cost: E('e3.4e12'),
            cdesc: `Meta-Supernova scales 50% weaker.`,
            ccost: E('ee3e15'),
        },
        {
            desc: `Neutronium-0 affects Aluminium-13 & Tantalum-73.`,
            cost: E('e4.8e12'),
            cdesc: `Neutronium-0 is better.`,
            ccost: E('ee6e15'),
        },
        {
            desc: `使强化器和时间速度的效果变为原来的25倍.`,
            cost: E('e1.4e13'),
            cdesc: `使强化器的溢出弱化.`,
            ccost: E('ee7.7777e15'),
        },
        {
            desc: `Stronger is ^1.1 stronger.`,
            cost: E('e2.8e13'),
            cdesc: `Stronger is ^2 stronger.`,
            ccost: E('ee1e16'),
        },
        {
            desc: `Strontium-38 is thrice effective.`,
            cost: E('e4e13'),
            cdesc: `Strontium-38's effect is squared.`,
            ccost: E('ee1.1111e16'),
        },
        {
            desc: `Mass Dilation upgrade 2 effect is overpowered.`,
            cost: E('e3e14'),
            cdesc: `这个元素的效果变得更好.`,
            ccost: E('ee1.7e16'),
        },
        {
            desc: `Pre-Ultra Mass Upgrades scale weaker based on Cosmic Ray's free tickspeeds.`,
            cost: E('e7e14'),
            effect() {
				if(player.ranks.hex.gte(84))return E(0);
                let x = tmp.atom?E(0.9).pow(tmp.atom.atomicEff.add(1).log10().pow(2/3)):E(1)
                return x
            },
            effDesc(x) { return formatReduction(x)+" weaker" },
            cdesc: `Super Overpower scales weaker based on Cosmic Ray's free tickspeeds.`,
            ccost: E('ee1.8e16'),
            ceffect() {
                let x = tmp.atom?E(0.999).pow(tmp.atom.atomicEff.add(1).log10().add(1).log10().add(1).log10()):E(1)
                return x
            },
            ceffDesc(x) { return formatReduction(x)+" weaker" },
        },
        {
            desc: `Stronger’s Power softcap starts 3x later, is 10% weaker.`,
            cost: E('e7.5e15'),
            cdesc: `使强化器的溢出弱化.`,
            ccost: E('ee1.9e16'),
        },
        {
            desc: `Tickspeed’s Power softcap starts ^2 later, scales 50% weaker.`,
            cost: E('e2e16'),
            cdesc: `Accelerator effect softcap^2 starts 2x later.`,
            ccost: E('ee2.5e16'),
        },
        {
            desc: `Carbon-6’s effect is overpowered, but Sodium-11 don’t work.`,
            cost: E('e150'),
            cdesc: `Square Carbon-6’s charged effect.`,
            ccost: E('ee3.7e16'),
        },
        {
            desc: `All scaling from Tickspeed start 100x later (after nerf from 8th QC modifier).`,
            cost: E('e500'),
            cdesc: `Meta-Tickspeeds starts ^2 later.`,
            ccost: E('ee5e16'),
        },
        {
            desc: `Mass of Black Hole effect raises itself at a reduced logarithm rate.`,
            cost: E('e1100'),
            effect() {
                let x = player.bh.mass.add(1).log10().add(1).log10().mul(1.25).add(1).pow(player.qu.rip.active?2:0.4)
                return x
            },
            effDesc(x) { return "^"+x.format() },
            cdesc: `The 2nd Black Hole Overflow effect is weaker.`,
            ccost: E('ee7.7777e16'),
        },
        {
            desc: `Death Shard is boosted by Dilated Mass.`,
            cost: E('e1300'),
            effect() {
				if(hasChargedElement(90))return ELEMENTS.upgs[90].ceffect();
                let x = player.md.mass.add(1).log10().add(1).pow(0.5)
				if(player.ranks.hex.gte(90))x = x.pow(1.1);
                return x.min('ee15');
            },
            effDesc(x) { if(hasChargedElement(90))return "^"+format(x);return format(x)+"x"+(x.gte('ee15')?" <span class='soft'>(hardcapped)</span>":"") },
            cdesc: `这个元素的效果变得更好.`,
            ccost: E('ee1.35e17'),
            ceffect() {
				if(hasChargedElement(90))return player.md.mass.add(1).log10().add(1).log10().add(1).log10().add(1).log10().add(1);
				return E(1);
            },
        },
        {
            desc: `Entropic Accelerator & Booster nerfing is 10% weaker.`,
            cost: E('e2700'),
            cdesc: `Boost Entropic Condenser.`,
            ccost: E('ee1.6e17'),
        },
        {
            desc: `Insane Challenges scale 25% weaker.`,
            cost: E('e4800'),
            cdesc: `Impossible Challenges scale 5% weaker`,
            ccost: E('ee1.6e17'),
        },
        {
            desc: `Entropy gain is increased by 66.7% for every OoM^2 of normal mass.`,
            cost: E('e29500'),
            effect() {
                let x = E(player.ranks.hex.gte(93)?2:(5/3)).pow(player.mass.add(1).log10().add(1).log10())
				x = overflow(x,"e1e4",hasElement(481)?0.37:hasChargedElement(93)?0.3:hasElement(296)?0.2:0.1);
                return x
            },
            effDesc(x) { return "x"+x.format()+(x.gte('e1e4')?" <span class='soft'>(softcapped)</span>":"")  },
            cdesc: `Softcap of this element is weaker.`,
            ccost: E('ee1.8e17'),
        },
        {
            desc: `Death Shard is increased by 10% for every supernova.`,
            cost: E("e32000"),
            effect() {
                let x = E(hasChargedElement(94)?1.2:1.1).pow(player.supernova.times)
                return x
            },
            effDesc(x) { return "x"+x.format() },
            cdesc: `The base of this element is 1.2, instead of 1.1.`,
            ccost: E('ee1.9e17'),
        },
        {
            desc: `Epsilon Particles are worked in Big Rip, but 90% weaker.`,
            cost: E("e34500"),
            cdesc: `Multiply Epsilon Particles effects by 10. Epsilon Particle's 的效果变得更好 if you're not in QC.`,
            ccost: E('ee2e17'),
        },
        {
            desc: `Entropic Converter nerfing is 10% weaker.`,
            cost: E('e202000'),
            cdesc: `Entropic Evaporation^2 is 10% weaker.`,
            ccost: E('ee3e17'),
        },
        {
            desc: `Increase Entropic Evaporation’s base by 1.`,
            cost: E('e8.5e6'),
            cdesc: `Increase Entropic Evaporation’s base by 1.`,
            ccost: E('ee4.2e17'),
        },
        {
            desc: `8th QC modifier in Big Rip is 20% weaker.`,
            cost: E('e1.2e7'),
            cdesc: `This element is applied outside of Big Rips.`,
            ccost: E('ee7e17'),
        },
        {
            desc: `Remove softcap^3 from Photon Upgrade 3 effect, its softcap^2 is weaker.`,
            cost: E('e2.15e7'),
            cdesc: `Photon Upgrades 变得更好.`,
            ccost: E('ee7.5e17'),
        },
        {
            desc: `Prestige Base’s exponent is increased based on Pent.`,
            cost: E('e2.5e7'),
            effect() {
				if(hasChargedElement(100)){
					return player.ranks.pent.add(1).log10().add(1).log10().add(1).log10().mul(10000);
				}
				if(player.ranks.pent.gte("ee10")){
					return player.ranks.pent.log10().log10().log10().mul(2605);
				}
				if(player.ranks.pent.gte("1e2000")){
					return player.ranks.pent.add(1).log10().add(1).log10().mul(260.5);
				}
                let x = player.ranks.pent.root(2).div(1e3).softcap(5.5,0.1,0);
				if(player.ranks.pent.gte(1e11))x = x.min(player.ranks.pent.log10().pow(8/9));
                return x
            },
            effDesc(x) { return "+^"+format(x) },
            cdesc: `这个元素的效果变得更好.`,
            ccost: E('ee8e17'),
        },
        {
            desc: `Blueprint Particles effect is overpowered.`,
            cost: E('e3.5e7'),
            cdesc: `这个元素的效果变得更好.`,
            ccost: E('ee1e18'),
        },
        {
            desc: `Tickspeed Power’s softcap starts ^100 later.`,
            cost: E('e111111111'),
            cdesc: `Accelerator Effect softcap starts 100x later.`,
            ccost: E('ee2.2222e18'),
        },
        {
            desc: `Pre-Quantum Global Speed is effective based on Honor.`,
            cost: E('e5e8'),
            effect() {
				if(hasChargedElement(103))return ELEMENTS.upgs[103].ceffect();
                let x = E(player.ranks.hex.gte(103)?2.1:2).pow(player.prestiges[1])
				if(hasPrestige(1,23))x = x.pow(prestigeEff(1,23))
                return x
            },
            effDesc(x) { if(hasChargedElement(103))return "^"+format(x);return format(x)+"x" },
            cdesc: `这个元素的效果变得更好. Also, permanently add ee10 Blueprint Particles to their effect.`,
            ccost: E('ee4e18'),
            ceffect() {
				if(hasChargedElement(103))return player.prestiges[1].add(1).log10().add(1).log10().add(1).pow(0.1).pow(hasPrestige(1,23)?prestigeEff(1,23):1);
				return E(1);
            },
        },
        {
            desc: `Add 200 more C9-12 maximum completions.`,
            cost: E('e1.2e9'),
            cdesc: `C9-12 的效果变得更好.`,
            ccost: E('ee1.5e19'),
        },
        {
            desc: `Each Particle Power’s 1st effect is exponentially overpowered.`,
            cost: E('e2.2e9'),
            cdesc: `这个元素的效果变得更好.`,
            ccost: E('ee5e19'),
        },
        {
            desc: `Entropic Evaporation^2 and Condenser^2 scale 15% weaker.`,
            cost: E('e7.25e9'),
            cdesc: `Entropic Evaporation^2 scale 15% weaker.`,
            ccost: E('ee6.8888e19'),
        },
        {
            desc: `Beta Particles are twice effective.`,
            cost: E('e1.45e10'),
            cdesc: `Beta Particles 变得更好.`,
            ccost: E('ee6.9e19'),
        },
        {
            desc: `All scalings from Ranks to Pent scale 10% weaker (only 2% during Big Rip).`,
            cost: E('e1.6e10'),
            cdesc: `All scalings from Hex to Oct scale 10% weaker.`,
            ccost: E('ee1e20'),
        },
        {
            desc: `Entropic Multiplier is effective, even in Big Rip.`,
            cost: E('e3e10'),
            cdesc: `Entropic Multiplier boost Entropy gain.`,
            ccost: E('ee1.3e20'),
            ceffect() {
				return E(1.2).pow(player.qu.en.rewards[0]);
            },
            ceffDesc(x) { return format(x)+"x" },
        },
        {
            desc: `Mass gain softcap^4 is 50% weaker (only 20% in Big Rip).`,
            cost: E('e6e10'),
            cdesc: `使强化器的溢出弱化`,
            ccost: E('ee1.6666e20'),
        },
        {
            desc: `Neutron Stars raise Atom gain.`,
            cost: E('e7.5e10'),
            effect() {
                let x = player.supernova.stars.add(1).log10().add(1).log10().add(1).root(3)
				if(hasChargedElement(111))x = x.pow(3);
                return x
            },
            effDesc(x) { return "^"+format(x) },
            cdesc: `这个元素的效果变得更好.`,
            ccost: E('ee2e20'),
        },
        {
            desc: `[sn4] effect is increased by 2.`,
            cost: E('e3e12'),
            cdesc: `[sn4] 的效果变得更好.`,
            ccost: E('ee4e20'),
        },
        {
            desc: `[bs2] uses a better formula.`,
            cost: E('e4e12'),
            cdesc: `这个元素的效果变得更好.`,
            ccost: E('ee4.4444e20'),
        },
        {
            desc: `Entropic Multiplier uses a better formula.`,
            cost: E('e1.2e13'),
            cdesc: `Entropic Multiplier boost Entropy gain.`,
            ccost: E('ee5e20'),
            ceffect() {
				return E(1.2).pow(player.qu.en.rewards[0]);
            },
            ceffDesc(x) { return format(x)+"x" },
        },
        {
            desc: `Mass Dilation upgrades are 5% stronger.`,
            cost: E("e7e13"),
            cdesc: `Mass Dilation upgrades are 5% stronger.`,
            ccost: E('ee1e21'),
        },
        {
            desc: `Prestige Base boosts Relativistic Energy gain.`,
            cost: E('e1e14'),
            effect() {
				if(hasChargedElement(116))return ELEMENTS.upgs[116].ceffect();
                let x = (tmp.prestiges.base||E(1)).add(1).root(3)
				if(player.ranks.hex.gte(116))x = x.pow(3)
                return x.min("e2e30")
            },
            effDesc(x) { if(hasChargedElement(116))return "^"+format(x);return format(x)+"x"+(x.gte('e2e30')?" <span class='soft'>(hardcapped)</span>":"") },
            cdesc: `这个元素的效果变得更好.`,
            ccost: E('ee1.5e21'),
            ceffect() {
				if(hasChargedElement(116))return (tmp.prestiges.base||E(1)).add(10).log10().pow(0.5);
				return E(1);
            },
        },
        {
            desc: `Mass gain after all softcaps is raised by 10.`,
            cost: E("e5e16"),
            cdesc: `Mass gain exponent ^1.01`,
            ccost: E('ee2.75e21'),
        },
        {
            desc: `解锁新的中子树升级。<span id="final_118" style="display:none;"></span>`,
            cost: E("e1.7e17"),
            cdesc: `Unlock even more Neutron Tree Upgrades.`,
            ccost: E("ee5.8e21"),
        },
		
		// extended element
		
		{
			desc: `无限质量加成时间碎片。`,
			cost: E("5e13"),
			effect() {
				let x = player.inf.points.add(10).log10();
				if(player.ranks.hex.gte(119))x = x.pow(2)
				if(hasChargedElement(119))x = overflow(x,10,5);
				return x
			},
			effDesc(x) { return format(x)+"x" },
            cdesc: `这个元素的效果变得更好.`,
            ccost: E("1.5e3300056"),
		},
		{
			desc: `每一个已购买的编号大于118的元素使无限质量和无限次数的获取量翻倍。`,
			cost: E("5e13"),
			effect() {
				if(hasElement(256))return E(2).pow(player.atom.elements.length);
				let x = E(1)
				for(var i = 0;i < player.atom.elements.length;i++)if(player.atom.elements[i]>118)x = x.mul(2);
				return x
			},
			effDesc(x) { return format(x)+"x" },
            cdesc: `Each charged element after Oganesson multiplies your Exotic Matter gain by 2.`,
            ccost: uni("3.3333e3333333"),
			ceffect() {
				let x = E(1)
				for(var i = 0;i < player.atom.chargedElements.length;i++)if(player.atom.chargedElements[i]>118)x = x.mul(2);
				return x
			},
			ceffDesc(x) { return format(x)+"x" },
		},
		{
			desc: `无限质量加成永恒质量。`,
			cost: E("1e15"),
			effect() {
				let x = player.inf.points.add(10).log10();
				if(hasChargedElement(121))x = overflow(x,10,3);
				if(hasElement(142))x = x.pow(2)
				if(hasChargedElement(142))x = x.pow(2)
				return x
			},
			effDesc(x) { return format(x)+"x" },
            cdesc: `这个元素的效果变得更好.`,
            ccost: uni("3.3333e3333333"),
		},
		{
			desc: `使碎片产生器倍率乘以1.5。`,
			cost: E("1e15"),
            cdesc: `Raise Shard Generators Power by 1.5`,
            ccost: E("1.5e3750056"),
		},
		{
			desc: `永恒次数加成永恒质量和无限次数。`,
			cost: E("5e4"),
			et: true,
			effect() {
				let x = player.et.times.add(1);
				if(hasChargedElement(123))x = x.pow(2);
				return x
			},
			effDesc(x) { return format(x)+"x" },
            cdesc: `Effect of this element is squared.`,
            ccost: uni("e24850"),
		},
		{
			desc: `永恒次数加成无限质量。`,
			cost: E("1e6"),
			et: true,
			effect() {
				let x = player.et.times.add(1);
				if(hasChargedElement(124))x = expMult(x,2);
				return x
			},
			effDesc(x) { return format(x)+"x" },
            cdesc: `这个元素的效果变得更好.`,
            ccost: uni("e25100"),
		},
		{
			desc: `无限次数加成熵获取速度。`,
			cost: E("1.6190000001e20"),
			effect() {
				let x = player.inf.times.add(1);
				if(hasChargedElement(125))x = expMult(x,3);
				return x
			},
			effDesc(x) { return format(x)+"x" },
            cdesc: `这个元素的效果变得更好.`,
            ccost: uni("1e4900000"),
		},
		{
			desc: `移除所有的费米子的阶层上限。`,
			cost: E("1.6190000001e23"),
            cdesc: `Meta-Fermion Tier starts 10x later.`,
            ccost: uni("1e4900000"),
		},
		{
			desc: `使120号元素可以加成永恒质量，只是效果倍率降低。`,
			cost: E("2e7"),
			et: true,
			effect() {
				let x = (tmp.elements.effect[120]||E(1)).pow(0.4);
				if(hasElement(131))x = x.pow(1.5);
				if(hasChargedElement(127))x = x.pow(1.5);
				if(hasChargedElement(131))x = x.pow(player.atom.chargedElements.length/100+1);
				return x
			},
			effDesc(x) { return format(x)+"x" },
            cdesc: `这个元素的效果变得更好.`,
            ccost: uni("e27875"),
		},
		{
			desc: `永恒质量加成无限质量。`,
			cost: E("2e8"),
			et: true,
			effect() {
				let x = player.et.points.add(1).log10().add(1);
				if(hasElement(140))x = player.et.points.add(1).pow(0.2);
				if(hasElement(147))x = x.pow(1.2);
				if(hasElement(157))x = x.pow(1.2);
				if(hasElement(221))x = x.pow(1.63);
				if(hasChargedElement(128))x = x.pow(21.3);
				if(hasChargedElement(140))x = x.pow(2.5);
				if(hasChargedElement(147))x = x.pow(1.2);
				if(hasChargedElement(157))x = x.pow(1.2);
				if(hasChargedElement(221))x = x.pow(2);
				return x
			},
			effDesc(x) { return format(x)+"x" },
            cdesc: `这个元素的效果变得更好.`,
            ccost: uni("e27925"),
		},
		{
			desc: `在大撕裂中，使“阶层超量”的效果变为原来的50%。`,
			cost: E("5.9720000001e27"),
            cdesc: `This element is applied outside of Big Rips.`,
            ccost: uni("e6000000"),
		},
		{
			desc: `'90%' in Neutron Tree Upgrade [br3] is now 80%.`,
			cost: E("5.9720000001e27").mul(200),
            cdesc: `Death Shards gain is squared.`,
            ccost: uni("e6050000"),
		},
		{
			desc: `你可以自动购买宇宙弦，127号元素的效果更好。`,
			cost: E("1e14"),
			et: true,
            cdesc: `The 127th element is better based on Charged Elements.`,
            ccost: uni("e42069"),
		},
		{
			desc: `If you bought [prim8], levels of Epsilon/Theta/Beta Particles is 1 per 2 Primordium Theorem, instead of 2.5.`,
			cost: E("1e15"),
			et: true,
            cdesc: `Gain 1.1x more Primordium Theorems.`,
            ccost: uni("e43000"),
		},
		{
			desc: `Uncap C12 completions.`,
			cost: E("1.9890000001e33"),
            cdesc: `C12 的效果变得更好.`,
            ccost: uni("e9050000"),
		},
		{
			desc: `解锁加速器，时间速度效果改为以指数加成质量，但是氩(18Ar)失效。`,
			cost: E("1.9890000001e33").mul(200),
            cdesc: `Accelerator Effect Softcap^2 is weaker.`,
            ccost: uni("e11500000"),
		},
		{
			desc: `加速器加成自身。`,
			cost: E("1e18"),
			et: true,
			effect() {
				let x = player.accelerator.div(1000).add(1);
				if(hasChargedElement(135))x = x.pow(2);
				return x
			},
			effDesc(x) { return "^"+format(x)},
            cdesc: `这个元素的效果变得更好.`,
            ccost: uni("e69000"),
		},
		{
			desc: `加速器加成量子之前所有资源获取速度。`,
			cost: E("1e19"),
			et: true,
			effect() {
				let x = player.accelerator.add(1);
				if(hasChargedElement(136))x = x.pow(2);
				return x
			},
			effDesc(x) { return format(x)+"x" },
            cdesc: `这个元素的效果变得更好.`,
            ccost: uni("e58000"),
		},
		{
			desc: `加速器加成时间速度倍率。`,
			cost: E("1.9890000001e37"),
            cdesc: `Accelerator Effect Softcap^2 is weaker.`,
            ccost: uni("e18888888"),
		},
		{
			desc: `Entropic Condenser^2 is 15% weaker.`,
			cost: E("1.9890000001e37"),
            cdesc: `Entropic Evaporation^2 is 15% weaker.`,
            ccost: uni("e22000000"),
		},
		{
			desc: `永恒次数加成熵获取。`,
			cost: E("1.6190000001e20"),
			et: true,
			effect() {
				let x = player.et.times.add(1);
				return x
			},
			effDesc(x) { return format(x)+"x" },
            cdesc: `Entropic Evaporation^2 is 15% weaker.`,
            ccost: uni("e88888"),
		},
		{
			desc: `128号元素变得更好。`,
			cost: E("1.6190000001e21"),
			et: true,
            cdesc: `这个元素的效果变得更好.`,
            ccost: uni("e99000"),
		},
		{
			desc: `Entropic Radiation^2 is 20% weaker.`,
			cost: E("2.98350000001e45"),
            cdesc: `Entropic Evaporation^2 is 15% weaker.`,
            ccost: uni("e3e7"),
		},
		{
			desc: `121号元素的效果变为原来的平方。`,
			cost: E("2.98350000001e45"),
            cdesc: `Element 121 is squared.`,
            ccost: uni("e4e7"),
		},
		{
			desc: `QC Modifier 'Intense Catalyst' is 5% weaker.`,
			cost: E("1.6190000001e26"),
			et: true,
            cdesc: `QC Modifier 'Intense Catalyst' is 5% weaker.`,
            ccost: uni("e144000"),
		},
		{
			desc: `Entropic Condenser^2 is 15% weaker.`,
			cost: E("1.6190000001e27"),
			et: true,
            cdesc: `Entropic Evaporation^2 is 15% weaker.`,
            ccost: uni("e144000"),
		},
		{
			desc: `获得10倍的转生质量。`,
			cost: E("2.98350000001e53"),
            cdesc: `Base Prestige Mass gain ^1.1`,
            ccost: uni("e56000000"),
		},
		{
			desc: `使高于1.8e308的熵加成基础无限质量获取。`,
			cost: uni(1),
            cdesc: `奇异物质加成黑暗射线to base Infinity Mass gain formula.`,
            ccost: uni("e56000000"),
		},
		{
			desc: `128号元素的效果变为原来的1.2次方。`,
			cost: E("5.9720000001e30"),
			et: true,
            cdesc: `Element 128's effect ^1.2.`,
            ccost: uni("e180000"),
		},
		{
			desc: `Timeshard effect is slightly stronger.`,
			cost: E("5.9720000001e31"),
			et: true,
			cdesc: `Timeshard effect is slightly stronger.`,
            ccost: uni("e181000"),
		},
		{
			desc: `使六重阶层的超级折算弱化5%。`,
			cost: uni(1e5),
            cdesc: `Meta-Hept is 5% weaker.`,
            ccost: uni("e63000000"),
		},
		{
			desc: `降低七重阶层的需求。`,
			cost: uni(1e7),
            cdesc: `这个元素的效果变得更好.`,
            ccost: uni("e64000000"),
		},
		{
			desc: `Entropic Condenser^2 is 15% weaker.`,
			cost: E("1.9890000001e34"),
			et: true,
			cdesc: `Entropic Condenser is better.`,
            ccost: uni("e200000"),
		},
		{
			desc: `If you bought [prim8], levels of Epsilon/Theta/Beta Particles is 1 per 1.5 Primordium Theorem, instead of 2.`,
			cost: E("1.9890000001e34"),
			et: true,
			cdesc: `Gain 1.1x more Primordium Theorems.`,
            ccost: uni("e200000"),
		},
		{
			desc: `削除转生质量效果的第一个软上限。`,
			cost: E("1.9890000001e36"),
			et: true,
			cdesc: `The second softcap of Prestige Mass effect is weaker.`,
            ccost: uni("e205000"),
		},
		{
			desc: `QC Modifier 'Intense Catalyst' is 5% weaker.`,
			cost: E("1.9890000001e40"),
			et: true,
            cdesc: `QC Modifier 'Intense Catalyst' is 5% weaker.`,
            ccost: uni("e205000"),
		},
		{
			desc: `Unlock the 13th Challenge.`,
			cost: uni(1e18),
            cdesc: `C13 effect softcap is weaker.`,
            ccost: uni("e66666666"),
		},
		{
			desc: `质子能量的效果变得更好。`,
			cost: uni(1e21),
            cdesc: `Effects of Protons Powers is better.`,
            ccost: uni("e67000000"),
		},
		{
			desc: `128号元素的效果变为原来的1.2次方。`,
			cost: E("1.9890000001e41").mul(3),
			et: true,
            cdesc: `Element 128's effect ^1.2.`,
            ccost: uni("e220000"),
		},
		{
			desc: `移除膨胀质量获取的软上限，膨胀溢出被削弱。`,
			cost: E("1.9890000001e41").mul(3),
			et: true,
            cdesc: `Dilated Overflow is weaker.`,
            ccost: uni("e220000"),
		},
		{
			desc: `Unlock the 14th Challenge.`,
			cost: uni(1e27),
            cdesc: `C14 effect is squared.`,
            ccost: uni("e90000000"),
		},
		{
			desc: `膨胀质量的基础效果变为原来的6次方。`,
			cost: uni(1e29),
            cdesc: `Base Dilated Mass effect ^6.`,
            ccost: uni("e90000000"),
		},
		{
			desc: `永恒质量加成时间碎片。`,
			cost: E("1.989e44"),
			et: true,
			effect() {
				let x = player.et.points.add(1).pow(0.2);
				if(hasElement(271))x = x.pow(20)
				if(hasElement(349))x = x.pow(3)
				if(hasChargedElement(161))x = x.pow(10)
				return x
			},
			effDesc(x) { return format(x)+"x" },
            cdesc: `这个元素的效果变得更好.`,
            ccost: uni("e280000"),
		},
		{
			desc: `削弱第一个级别坍缩效果。`,
			cost: E("2.98350000001e45"),
			et: true,
            cdesc: `Meta-Hept is 1% weaker.`,
            ccost: uni("e288888"),
		},
		{
			desc: `使高于1.8e308的转生基础值加成基础无限质量获取。`,
			cost: uni(6e35),
            cdesc: `深渊之渍 Post-1.8e308 added to base Infinity Mass gain formula.`,
            ccost: uni("e107000000"),
		},
		{
			desc: `Unlock the 15th Challenge.`,
			cost: uni(5e39),
            cdesc: `Change C15 effect.`,
            ccost: uni("e108000000"),
		},
		{
            desc: `Entropic Evaporation^2 is 5% weaker.`,
			cost: E("2.9835e49"),
			et: true,
			cdesc: `Entropic Evaporation^2 is 5% weaker.`,
            ccost: uni("e310000"),
		},
		{
            desc: `If you bought [prim8], levels of Epsilon/Theta/Beta Particles is 1 per 1 Primordium Theorem, instead of 1.5.`,
			cost: uni(1),
			et: true,
			cdesc: `Gain 1.1x more Primordium Theorems.`,
            ccost: uni("e310000"),
		},
		{
			desc: `Entropic Condenser^2 is 15% weaker.`,
			cost: uni(1e61),
			cdesc: `Entropic Condenser is better.`,
            ccost: uni("e1.3e8"),
		},
		{
			desc: `Unlock the 16th Challenge.`,
			cost: uni(1e100),
			cdesc: `C16 boost Prestige Muscler Effect.`,
            ccost: uni("e1.6e8"),
			ceffect() {
				let x = player.chal.comps[16].add(10).log10().sqrt();
				return x
			},
			ceffDesc(x) { return "^"+format(x) },
		},
		{
            desc: `削弱第一个级别坍缩效果。`,
			cost: uni(1e21),
			et: true,
			cdesc: `Meta-Hex starts 1e100x later.`,
            ccost: uni("e400000"),
		},
		{
            desc: `修改挑战5的效果。挑战15的目标变得更低。`,
			cost: uni(1e22),
			et: true,
            cdesc: `C5 effect is changed. C21 goal is heavily weaken.`,
            ccost: uni("e400000"),
		},
		{
            desc: `削弱第二个级别坍缩效果。`,
			cost: uni(1e23),
			et: true,
			cdesc: `Meta-Hex starts 1e100x later.`,
            ccost: uni("e444444"),
		},
		{
            desc: `QC Modifier 'Intense Catalyst' is 6% weaker.`,
			cost: uni(1e26),
			et: true,
			cdesc: `QC Modifier 'Intense Catalyst' is 6% weaker.`,
            ccost: uni("e444444"),
		},
		{
            desc: `助推器加成自身。`,
			cost: uni(1e147),
			effect() {
				let x = (player.massUpg[2]||E(0)).add(10).log10().pow(0.6);
				if(hasElement(244))x = expMult((player.massUpg[2]||E(1)),0.4);
				if(hasElement(283))x = overflow(expMult((player.massUpg[2]||E(1)),0.875),"e3500000",0.5);
				if(hasElement(328))x = expMult((player.massUpg[2]||E(1)),0.875);
				if(hasElement(360))x = expMult((player.massUpg[2]||E(1)),0.886);
				if(hasElement(367))x = expMult((player.massUpg[2]||E(1)),0.9);
				if(hasElement(459))x = expMult((player.massUpg[2]||E(1)),0.95);
				if(hasChargedElement(173))x = expMult((player.massUpg[2]||E(1)),0.96);
				return x
			},
			effDesc(x) { return "^"+format(x) },
            cdesc: `这个元素的效果变得更好.`,
            ccost: uni("e2.5e8"),
		},
		{
            desc: `锻体器加成自身。`,
			cost: uni(1e150),
			effect() {
				let x = (player.massUpg[1]||E(0)).add(10).log10().pow(0.6);
				if(hasElement(244))x = expMult((player.massUpg[1]||E(1)),0.4);
				if(hasElement(283))x = overflow(expMult((player.massUpg[1]||E(1)),0.875),"e3500000",0.5);
				if(hasElement(328))x = expMult((player.massUpg[1]||E(1)),0.875);
				if(hasElement(360))x = expMult((player.massUpg[1]||E(1)),0.886);
				if(hasElement(367))x = expMult((player.massUpg[1]||E(1)),0.9);
				if(hasElement(459))x = expMult((player.massUpg[1]||E(1)),0.95);
				if(hasChargedElement(174))x = expMult((player.massUpg[1]||E(1)),0.96);
				return x
			},
			effDesc(x) { return "^"+format(x) },
            cdesc: `这个元素的效果变得更好.`,
            ccost: uni("e2.5e8"),
		},
		{
            desc: `挑战13和15的次数上限增加100。`,
			cost: uni(1e27),
			et: true,
			cdesc: `Reduce C13 & C15 Goals.`,
            ccost: uni("e495000"),
		},
		{
            desc: `削弱第二个级别坍缩效果。`,
			cost: uni(1e27),
			et: true,
			cdesc: `Meta-Hept starts 2x later.`,
            ccost: uni("e495000"),
		},
		{
            desc: `Entropic Condenser^2 is 15% weaker.`,
			cost: E(1.5e217),
            cdesc: `Entropic Condenser is better.`,
            ccost: uni("e2.8e8"),
		},
		{
            desc: `移除阶层除元折算以外的所有折算。`,
			cost: E(1.5e221),
            cdesc: `Meta-Tickspeed scaling starts ^2 later.`,
            ccost: uni("e2.9e8"),
		},
		{
			desc: `'80%' in Neutron Tree Upgrade [br3] is now 70%.`,
			cost: uni(1e32),
			et: true,
            cdesc: `Death Shards gain ^2.5`,
            ccost: uni("e565000"),
		},
		{
			desc: `如果你不在大撕裂中，绿色色度的效果变为原来的1.5次方。`,
			cost: uni(1e36),
			et: true,
            cdesc: `绿色色度's softcap starts weaker.`,
            ccost: uni("e570000"),
		},
		{
			desc: `削弱第三个级别坍缩效果。`,
			cost: uni(1e203),
            cdesc: `Meta-Hept starts 2x later.`,
            ccost: uni("e3.4e8"),
		},
		{
			desc: `挑战13和16的次数上限增加100。`,
			cost: E(9e284),
            cdesc: `C13 的效果变得更好.`,
            ccost: uni("e3.5e8"),
		},
		{
			desc: `移除第一个级别坍缩效果。`,
			cost: uni(1e45),
			et: true,
            cdesc: `Meta-Hept starts 2x later.`,
            ccost: uni("e660000"),
		},
		{
			desc: `移除第二个级别坍缩效果。`,
			cost: uni(1e48),
			et: true,
            cdesc: `Meta-Hept starts 2x later.`,
            ccost: uni("e680000"),
		},
		{
			desc: `量子挑战5高于20的效果被削弱。`,
			cost: E(1.5e294),
            cdesc: `Remove all QC Modifier 'Intense Catalyst' effect scaling.`,
            ccost: uni("e4.2e8"),
		},
		{
			desc: `挑战13和15的次数上限增加300。`,
			cost: E(6e299),
            cdesc: `C15 的效果变得更好.`,
            ccost: uni("e4.4e8"),
		},
		{
			desc: `移除宇宙弦的超级折算。`,
			cost: uni(1e49),
			et: true,
            cdesc: `Square [qu6].`,
            ccost: uni("e790000"),
		},
		{
			desc: `撕裂膨胀升级5影响阶层的元折算。`,
			cost: uni(5e51),
			et: true,
            cdesc: `Break Dilation Upgrade 5 affects Meta-Hept scaling at a reduced rate.`,
            ccost: uni("e850000"),
		},
		{
			desc: `使高于1.8e308克的无限质量加成基础无限质量获取。`,
			cost: E(2).pow(1024),
			 cdesc: `这个元素的效果是原来的平方.`,
            ccost: uni("e555555555"),
		},
		{
			desc: `挑战13和16的次数上限增加200。`,
			cost: E("6e310"),
            cdesc: `C13 的效果变得更好.`,
            ccost: uni("e5.7e8"),
		},
		{
			desc: `移除级别坍缩。`,
			cost: uni(1e54),
			et: true,
            cdesc: `Meta-Hex starts ^2 later.`,
            ccost: uni("e1e6"),
		},
		{
			desc: `Unlock the 17th Challenge.`,
			cost: uni(1e61),
			et: true,
            cdesc: `Hardened Challenge scaling of C20 is weaker based on C17 completions.`,
            ccost: uni("e1.1e6"),
			ceffect() {
				let x = E(0.99).pow(player.chal.comps[17].add(1).log10());
				return x
			},
			ceffDesc(x) { return formatReduction(x)+" weaker" },
		},
		{
			desc: `移除辐射波加成“级别元折算加成”的3个软上限。`,
			cost: uni(1e301),
            cdesc: `Radiation Booster 'Meta-Rank Boost' affects Meta-Hept at a reduced rate.`,
            ccost: uni("e7.24e8"),
			ceffect() {
				let x = tmp.radiation.bs.eff[14].add(1).log10().add(1).log10().add(1).log10().add(1).log10().add(1).pow(0.5);
				return x
			},
			ceffDesc(x) { return format(x)+"x later"; },
		},
		{
			desc: `挑战13的次数上限增加200。`,
			cost: E("3e393"),
            cdesc: `C13 的效果变得更好.`,
            ccost: uni("e7.25e8"),
		},
		{
			desc: `每秒获得永恒质量和永恒次数，数量为重置时获取量的100%。`,
			cost: uni(1e71),
			et: true,
            cdesc: `永恒质量 gain formula is better.`,
            ccost: uni("e1.15e6"),
		},
		{
			desc: `膨胀溢出被削弱。`,
			cost: uni(1e75),
			et: true,
            cdesc: `Dilated Overflow is weaker.`,
            ccost: uni("e1.35e6"),
		},
		{
			desc: `Entropic Condenser^2 is 15% weaker.`,
			cost: E("1.5e461"),
            cdesc: `Entropic Condenser is better.`,
            ccost: uni("e7.7e8"),
		},
		{
			desc: `Entropic Evaporation^2 is 10% weaker.`,
			cost: E("1e500"),
            cdesc: `Entropic Evaporation^2 is 10% weaker.`,
            ccost: uni("e7.7e8"),
		},
		{
			desc: `修改挑战5的效果。`,
			cost: E("3e144"),
			et: true,
			cdesc: `C5 effect is changed.`,
			ccost: uni("e1440000"),
		},
		{
			desc: `如果你不在大撕裂或量子挑战中，艾普西隆[Ε]粒子的第二个效果更好。`,
			cost: E("3e152"),
			et: true,
			cdesc: `Gain 1.1x more Primordium Theorems.`,
            ccost: uni("e1.5e6"),
		},
		{
			desc: `Entropic Radiation^2 is 25% weaker.`,
			cost: E("1.5e523"),
            cdesc: `Entropic Evaporation^2 is 25% weaker.`,
            ccost: uni("e8.5e8"),
		},
		{
			desc: `移除级别的元折算。辐射波加成“级别元折算加成”以较低的效果影响阶层的元折算。`,
			cost: E("1.5e527"),
			effect() {
				let x = tmp.radiation.bs.eff[14].add(1).log10();
				return x
			},
			effDesc(x) { return format(x)+"x later"; },
            cdesc: `Radiation Booster 'Meta-Rank Boost' affects Meta-Hex at a reduced rate.`,
            ccost: uni("e8.7e8"),
			ceffect() {
				let x = tmp.radiation.bs.eff[14].add(1).log10().add(1).log10();
				if(hasChargedElement(207))x = x.pow(10);
				return x
			},
			ceffDesc(x) { return format(x)+"x later"; },
		},
		{
			desc: `'70%' in Neutron Tree Upgrade [br3] is now 60%.`,
			cost: E("1.5e634"),
            cdesc: `Death Shards gain is squared`,
            ccost: uni("e8.8e8"),
		},
		{
			desc: `挑战13的次数上限增加1000。`,
			cost: E("1.5e674"),
            cdesc: `C13 的效果变得更好.`,
            ccost: uni("e9.4e8"),
		},
		{
			desc: `Unlock the 18th Challenge.`,
			cost: uni(2e123),
			et: true,
			cdesc: `C18 的效果变得更好.`,
			ccost: uni("e1530000"),
		},
		{
			desc: `挑战14和16的次数上限增加100。`,
			cost: E("7.5e193"),
			et: true,
			cdesc: `C14 的效果变得更好.`,
			ccost: uni("e1590000"),
		},
		{
			desc: `移除辐射波加成“级别元折算加成”的1个软上限。`,
			cost: E("6e832"),
            cdesc: `Charged Effect of Element 202 ^10`,
            ccost: uni("e9.6e8"),
		},
		{
			desc: `Entropic Radiation^2 is 50% weaker.`,
			cost: E("6e852"),
            cdesc: `Entropy Cap is multiplied by ee35.`,
            ccost: uni("e9.7e8"),
		},
		{
			desc: `Unlock the 19th Challenge.`,
			cost: uni(1e158),
			et: true,
			cdesc: `C19 的效果变得更好.`,
			ccost: uni("e1650000"),
		},
		{
			desc: `挑战14和17的次数上限增加100。`,
			cost: E("9e224"),
			et: true,
			cdesc: `C14 的效果变得更好.`,
			ccost: uni("e1660000"),
		},
		{
			desc: `无限升级3的效果变为原来的1.2次方。`,
			cost: E("1.5e955"),
			cdesc: `无限升级 3 的效果变得更好.`,
			ccost: mlt(1.155),
		},
		{
			desc: `荣耀9的效果变为原来的2倍。`,
			cost: E("1.5e1099"),
			cdesc: `Raise Honor 9 Effect by 1.35`,
			ccost: mlt(1.169),
		},
		{
			desc: `Unlock the 20th Challenge.`,
			cost: uni(1e197),
			et: true,
			cdesc: `C20 effect boost Tickspeed Power.`,
			ccost: uni("e1940000"),
		},
		{
			desc: `挑战15和16的次数上限增加200。`,
			cost: uni(2e198),
			et: true,
			cdesc: `C15 的效果变得更好.`,
			ccost: uni("e1960000"),
		},
		{
			desc: `荣耀9的效果变为原来的2倍。`,
			cost: E("1.5e1145"),
			cdesc: `Raise Honor 9 Effect by 1.05`,
			ccost: mlt(1.31),
		},
		{
			desc: `永恒次数加成量子次数。`,
			cost: E("1.5e1157"),
			effect() {
				let x = player.et.times.add(1);
				if(hasChargedElement(216))x = x.pow(2);
				return x
			},
			effDesc(x) { return format(x)+"x"; },
            cdesc: `这个元素的效果变得更好.`,
            ccost: mlt(1.5),
		},
		{
			desc: `永恒质量加成永恒次数。`,
			cost: uni(1e206),
			et: true,
			effect() {
				let x = player.et.points.add(1).log10();
				if(hasChargedElement(217))x = overflow(x,10,2.5);
				return x
			},
			effDesc(x) { return format(x)+"x"; },
            cdesc: `这个元素的效果变得更好.`,
			ccost: uni("e2150000"),
		},
		{
			desc: `在超新星选项卡中解锁超新星星系。`,
			cost: uni(1e210),
			et: true,
            cdesc: `Reduce Supernova Galaxies Requirements.`,
			ccost: uni("e2160000"),
		},
		
		// extended element II
		
		
		{
			desc: `中子树升级[sn6]变得更好。`,
			cost: E(1e6),
			cdesc: `第1幕目标：击败地宫养殖者————greenshayu88   作为见面礼，将中子树升级[sn6]的效果^9e15.`,
			ccost: E("e5850000000"),
			galQk: true,
			
		},
		{
			desc: `自动购买碎片生成器。`,
			cost: E("1.5e516"),
			et: true,
			cdesc: `鲨鱼吸收了永恒质量，变得更强大了，使时间碎片的效果^2.`,
			ccost: E("e6070000"),
		},
		{
			desc: `128号元素的效果变为原来的1.63次方。`,
			cost: E("1.5e2976"),
			cdesc: `鲨鱼从地核捡到了128号元素，发现它的效果变成了原来的平方.`,
			ccost: E("e5900000000"),
		},
		{
			desc: `Uncap C13 completions.`,
			cost: E(1e7),
			galQk: true,
			cdesc: `奇异鲨鱼用锋利的牙齿咬了一口挑战13效果的软上限（弱化）.`,
			ccost: E("e6150000000"),
		},
		{
			desc: `时间碎片 的效果变得更好.`,
			cost: E("1.5e533"),
			et: true,
			cdesc: `鲨鱼吃掉了辉煌的超究折算，降伏器和星系费米子的超级折算，顺便吃掉了锻体器和助推器.`,
			ccost: E("e6360000"),			
		},
		{
			desc: `移除辐射波加成“级别元折算加成”的1个软上限。`,
			cost: E("1.5e3306"),
			cdesc: `鲨鱼吃掉了[奇夸克],[顶夸克]和[陶子]效果的硬上限.`,
			ccost: E("e6240000000"),	
		},
		{
			desc: `削弱星系能量效果的软上限。`,
			cost: E(2.5e7),
			galQk: true,
			cdesc: `鲨鱼进行了研究，使星系能量效果的软上限再次削弱.`,
			ccost: E("e6280000000"),	

		},
		{
			desc: `时间碎片 的效果变得更好.`,
			cost: E("1.5e560"),
			et: true,
			cdesc: `鲨鱼的境界提升至潮汐级初等，使时间碎片的效果^1.2.`,
			ccost: E("e6520000"),	
		},
		{
			desc: `挑战17的次数上限增加300。`,
			cost: E("1.5e3656"),
			cdesc: `鲨鱼进进出出海洋，挑战22的次数上限增加300.`,
			ccost: E("e6338000000"),				
		},
		{
			desc: `削弱星系能量效果的软上限。`,
			cost: E(1e8),
			galQk: true,
			cdesc: `鲨鱼要膨胀了，但移除膨胀质量溢出.`,
			ccost: E("e6335000000"),							
		},
		{
			desc: `挑战20效果变为原来的立方。`,
			cost: E("1.5e606"),
			et: true,
			cdesc: `鲨鱼不想打星系挑战了，所以星系碎片的公式变得更好但有硬上限（1e25）.`,
			ccost: E("e6630000"),							
		},
		{
			desc: `修改挑战5的效果。`,
			cost: E("1.5e3806"),
			cdesc: `鲨鱼发现挑战15好像没用了，所以修改挑战15的效果.`,
			ccost: E("e6345555555"),										
		},
		{
			desc: `星系夸克加成夸克获取。`,
			cost: E(5e8),
			galQk: true,
			effect() {
				let x = player.galQk.add(1);
				if(hasElement(264))x = expMult(x,2);
				if(hasElement(278))x = expMult(x,1.3);
				if(hasElement(364))x = expMult(x,2.5/1.3);
				if(hasChargedElement(231))x =  expMult(x,1.15);
				return x
			},
			effDesc(x) { return "^"+format(x); },
			cdesc: `这个元素的效果变得更好.`,
			ccost: E("e7060000000"),										
		},
		{
			desc: `基于阶层，使三重阶层的元折算延迟出现。`,
			cost: E("1.5e611"),
			et: true,
			effect() {
				let x = player.ranks.tier.add(10).log10().sqrt();
				if(hasElement(276))x = expMult(player.ranks.tier,0.55);
				if(hasElement(311))x = expMult(player.ranks.tier,0.6);
				return x
			},
			effDesc(x) { return format(x)+"x later"
			},
			ceffect() {
				let x = player.ranks.tier.add(10).log10().sqrt().add(10).log10().pow(2).floor();
				return x
			},
			ceffDesc(x) { return "当前战力"+format(x)
			},
			cdesc: `解锁鲨鱼战力，数值见下，(之后会有用).`,
			ccost: E("e7730000"),									
		},
		{
			desc: `挑战18效果变得更好。`,
			cost: E("1.5e3816"),
			cdesc: `鲨鱼觉得Alan Walker的歌太好听了，所以褪色物质的效果变得更好.`,
			ccost: E("e7050000000"),					
		},
						
		
		{
			desc: `星系原子的效果变得更好。`,
			cost: E(2.5e9),
			galQk: true,
			cdesc: `鲨鱼原子化了，解锁转生原子.`,
			ccost: E("e7500000000"),				
		},
		{
			desc: `使挑战19的次数上限增加300次.`,
			cost: E("1.5e648"),
			et: true,
			cdesc: `转生质量好像没用了，那就用转生原子来代替吧，现在转生原子能弱化七重阶层的元折算了.`,
			ccost: E("e8380000"),
		},
		{
			desc: `使挑战18的次数上限增加300次.`,
			cost: E("1.5e4856"),
			cdesc: `奇异之鲨想要更多物质，使挑战23的效果变得更好.`,
			ccost: E("e7650000000"),
		},
		{
			desc: `在超新星选项卡中解锁星系费米子.`,
			cost: E(6e9),
			galQk: true,
			cdesc: `转生原子还是没什么用，那就让它加成前面所有转生资源的获取.`,
			ccost: E("e7750000000"),
		},
		{
			desc: `时间碎片 的效果变得更好.`,
			cost: E("1.5e671"),
			et: true,
			cdesc: `鲨鱼深渊化了，使深渊之渍3的效果变得更好.`,
			ccost: E("e8650000"),
		},
		{
			desc: `移除阶层的元折算. 辐射波加成'级别元折算加成'能以较弱的效果对三重阶层的元折算生效.`,
			cost: E("1.5e5256"),
			effect() {
				let x = tmp.radiation.bs.eff[14].add(1).log10().add(1).log10();
				if(hasElement(276))x = tmp.radiation.bs.eff[14].add(1).log10().pow(0.2);
				if(hasElement(295))x = tmp.radiation.bs.eff[14].add(1).log10().pow(0.5);
				return x
			},
			effDesc(x) { return format(x)+"x later"; },
			cdesc: `鲨鱼遁入黑暗，使黑暗之影5的效果变得更好.`,
		    ccost: E("e7875000000"),		
		},
		
		{
			desc: `超新星星系加成狂怒能量获取的效果变得更好.`,
			cost: E(3e10),
			galQk: true,
			cdesc: `鲨鱼碰到了 超级折算|充能元素需求 使从下一个开始的充能元素需要2种东西同时满足才生效(折算强制生效，作为补偿，降低超新星星团价格增长).`,
		    ccost: E("e7940000000"),		
		},
		{
			desc: `弱化第一个黑洞溢出.`,
			cost: E("1.5e704"),
			et: true,
			cdesc: `再这样下去质量都不膨胀了，所以使坍缩星辰第三个效果^100(需:eee126黑洞质量).`,
		    ccost: E("e9070000"),		
		},
		{
			desc: `三重阶层的元折算延迟10倍出现.`,
			cost: E("1.5e5656"),
			cdesc: `怎么loader写的九重阶层效果还没用完，使七重阶层的元折算延迟10倍出现(需:e1.5e373量子泡沫).`,
		    ccost: E("e8370000000"),		
		},
		{
			desc: `使120号元素可以加成永恒次数，只是效果倍率降低.`,
			cost: E("1.5e706"),
			et: true,
			effect() {
				let x = (tmp.elements.effect[120]||E(1)).pow(0.1);
				return x
			},
			effDesc(x) { return format(x)+"x"; },
			cdesc: `奇异次数好像一直都没涨，所以使这个元素的效果加成它(需:e6118星系夸克).`,
		    ccost: E("e9220000"),		
		},
		{
			desc: `元素173-174变得更好.`,
			cost: E("1.5e5796"),
			cdesc: `鲨鱼不够英勇，使转生原子的效果可以对荣耀的奇异折算生效(需:ee2.3e128夸克).`,
		    ccost: E("e8566000000"),		
		},
		{
			desc: `解锁2个星系费米子类型.`,
			cost: E(1e11),
			galQk: true,
			ceffect() {
				let x = (tmp.elements.ceffect[232]||E(1))
				if(!hasChargedElement(232))x = 1
				return x
			},
			ceffDesc(x) {if(!hasChargedElement(232)) return "您还没有鲨鱼战力"
				else if(hasChargedElement(232)) return  "弱化"+format(x)+"倍"
			},
			cdesc: `鲨鱼战力使超新星的元折算弱化(需:e1115奇异物质).`,
		    ccost: E("e8680000000"),		
		},
		{
			desc: `所有玻色子基础获取x100`,
			cost: E("1.5e721"),
			et: true,
			cdesc: `星系费米子好像有点问题？自动获得最后2个星系费米子(需:e9250000000无限质量).`,
		    ccost: E("e10000000"),		
		},
		{
			desc: `使挑战14的次数上限增加400次.`,
			cost: E("1.5e6226"),
			cdesc: `超新星星系的价格增长太快了，使转生原子的效果可以对超新星星系的超级折算生效(需:ee4.4e123质量).`,
		    ccost: E("e9280000000"),		
		},
		{
			desc: `弱化星系能量软上限的效果.`,
			cost: E(1e12),
			galQk: true,
			cdesc: `来点简单粗暴的加成，质量获取指数^10(需:3120超新星星系).`,
		    ccost: E("e9290000000"),		
		},
		{
			desc: `使挑战18，19的次数上限增加100次.`,
			cost: E("1.5e756"),
			et: true,
			ceffect() {
				let x = (beyondRankTier(10).add(1).mul(8))
				
				return x
			},
			ceffDesc(x) {   return "^"+format(x);
			},
			cdesc: `鲨鱼获得了8黑洞，使黑洞质量获取指数基于十一重阶层而增加(需:1e142恒星质量).`,
		    ccost: E("e10100000"),		
		},
		{
			desc: `蓝色色度的效果变得更好.`,
			cost: E("1.5e6956"),
			cdesc: `星团环绕着鲨鱼，再次降低超新星星团的要求(需:1e1300000000橙色物质).`,
		    ccost: E("e9315000000"),		
		},
		{
			desc: `你可以分配星系夸克. (在原子选项卡)`,
			cost: E(1e13),
			galQk: true,
			cdesc: `（558+259=817……这是什么）解锁转生夸克(需:425奇异推进点数).`,
		    ccost: E("e10200000000"),		
		},
		{
			desc: `使挑战17-19的次数上限增加250次.`,
			cost: E("9e779"),
			et: true,
			cdesc: `鲨鱼没活了，使挑战14,19,21的效果变得更好(需:e5e204量子之前所有资源获取速度）.`,
		    ccost: E("e11100000"),		
			
		},
		{
			desc: `加速器效果的软上限弱化.`,
			cost: E("1.5e7256"),
			cdesc: `鲨鱼要加速了，加速器效果的软上限再次弱化(需:e235g雕文质量）.`,
		    ccost: E("e1.075e10"),		
		},
		{
			desc: `超新星星系加成熵获取的效果变得更好.`,
			cost: E(5e13),
			galQk: true,
			cdesc: `超新星要到无限了，但总有不好的预感，星辰生成器的效果指数基于超新星星团增加（需:e160暗射线）.`,
		    ccost: E("e1.080e10"),	
			ceffect() {
				let x = (player.superCluster.add(1).pow(0.05))
				
				return x
			},
			ceffDesc(x) {   return "^"+format(x);
			},
		},
		{
			desc: `使购买元素数量加成转生质量获取.`,
			cost: E("1.5e786"),
			et: true,
			effect() {
				let x = E(1.02).pow(player.atom.elements.length);
				if(hasChargedElement(255))x = E(1.03).pow(player.atom.elements.length);
				return x
			},
			effDesc(x) { return format(x)+"x"; },
			cdesc: `使这个元素的效果变得更好且加成奇异物质获取（需:2245飞升等级）.`,
		    ccost: E("e11300000"),	
		},
		{
			desc: `使元素120的效果现在基于所有元素.`,
			cost: E("1.5e7606"),
			cdesc:` 解锁一个超新星星系的效果（需:7.11111星辰第3效果）.`,
		    ccost: E("e1.105e10"),	
		},
		{
			desc: `弱化星系能量软上限的效果.`,
			cost: E(1e24),
			galQk: true,
			cdesc:` 重置了最终星辰碎片后产能减少了？使转生原子和转生夸克获取x100（需:1e15625转生黑洞质量）.`,
		    ccost: E("e11100000000"),	
		},
		{
			desc: `使挑战17-19的次数上限增加250次.`,
			cost: E("1.5e821"),
			et: true,
			cdesc:` 要到40超新星星团了，使挑战21的次数上限增加100次且降低它的目标（需:完成280次挑战22）.`,
		    ccost: E("e11930000"),	
		},
		{
			desc: `使转生质量的效果也可以对辉煌的究极折算和费米子阶层的元折算生效.`,
			cost: E("1.5e7806"),
			cdesc:`解锁转生星辰，质量获取指数^1.25（需:充能之前的所有元素或进行1次行星重置）.`,
		    ccost: E("e1.135e10"),	
		},
		{
			desc: `星系夸克的获取变得更好.`,
			cost: E(2e24),
			galQk: true,
		},
		{
			desc: `解锁2个星系费米子类型.`,
			cost: E(2e29),
			galQk: true,
		},
		{
			desc: `第一个黑洞溢出的效果弱化.`,
			cost: E("1.5e824"),
			et: true,
		},
		{
			desc: `中子树升级[br3]的60%变为50%.`,
			cost: E("1.5e8006"),
		},
		{
			desc: `元素231的效果变得更好.`,
			cost: E(4e30),
			galQk: true,
		},
		{
			desc: `改变挑战5的效果.`,
			cost: E("1.5e834"),
			et: true,
		},
		{
			desc: `熵压缩^2和熵辐射^2的折算弱化90%.`,
			cost: E("1.5e8116"),
		},
		{
			desc: `解锁星系挑战.`,
			cost: E(1e31),
			galQk: true,
		},
		{
			desc: `熵获取变得更好.`,
			cost: E("1.5e839"),
			et: true,
		},
		{
			desc: `弱化熵加速的软上限.`,
			cost: E("1.5e8326"),
		},
		{
			desc: `星系玻色子的效果变得更好.`,
			cost: E(2e31),
			galQk: true,
		},
		{
			desc: `元素161的效果变得更好.`,
			cost: E("1.5e842"),
			et: true,
		},
		{
			desc: `三重阶层的数值延迟五重阶层的元折算.`,
			cost: E("1.5e8526"),
			effect() {
				let x = player.ranks.tetr.add(10).log10().sqrt();
				if(hasElement(301))x = x.pow(2);
				return x
			},
			effDesc(x) { return format(x)+"x later"; },
		},
		{
			desc: `减少星系费米子的目标.`,
			cost: E(5e31),
			galQk: true,
		},
		{
			desc: `弱化绿色色度软上限的效果.`,
			cost: E("1.5e854"),
			et: true,
		},
		{
			desc: `解锁2个星系费米子类型.`,
			cost: E(5e32),
			galQk: true,
		},
		{
			desc: `元素232和239的效果变得更好.`,
			cost: E("1.5e856"),
			et: true,
		},
		{
			desc: `挑战20的次数上限增加100次. 且它的效果变得更好.`,
			cost: E("1.5e8856"),
		},
		{
			desc: `元素231的效果变得更好.`,
			cost: E("1.5e33"),
			galQk: true,
		},
		{
			desc: `暗物质升级19的效果变得更好.`,
			cost: E("1.5e886"),
			et: true,
		},
		{
			desc: `挑战17到挑战19的次数上限增加500次.`,
			cost: E("1.5e9356"),
		},
		{
			desc: `星系碎片的效果也可以对 affects Galactic Dark Energy.`,
			cost: E("1e34"),
			galQk: true,
		},
		{
			desc: `钚(94Pu)的效果现在是100%.`,
			cost: E("1.5e900"),
			et: true,
		},
		{
			desc: `元素173和174的效果变得更好.`,
			cost: E("1.5e9836"),
		},
		{
			desc: `解锁2个星系费米子类型.`,
			cost: E("1e35"),
			galQk: true,
		},
		{
			desc: `声望等级的元折算延迟3.5倍开始.`,
			cost: E("1.5e926"),
			et: true,
		},
		{
			desc: `自动完成挑战13.`,
			cost: E("1.5e10056"),
		},
		{
			desc: `星系碎片的效果也可以对星系夸克生效.`,
			cost: E("1e36"),
			galQk: true,
		},
		{
			desc: `光子和胶子的升级3变得更好.`,
			cost: E("1.5e1006"),
			et: true,
		},
		{
			desc: `移除挑战14,15的次数上限.`,
			cost: E("1.5e10656"),
		},
		{
			desc: `解锁一个星系挑战设置.`,
			cost: E("1e38"),
			galQk: true,
		},
		{
			desc: `打破超新星上限并减少超新星星系的需求.`,
			cost: E("5e39"),
			galQk: true,
		},
		{
			desc: `移除强化器的软上限.`,
			cost: E("1.5e11936"),
		},
		{
			desc: `荣耀的超究折算延迟2次开始.`,
			cost: E("1.5e1031"),
			et: true,
		},
		{
			desc: `解锁2个星系费米子类型.`,
			cost: E("1e41"),
			galQk: true,
		},
		{
			desc: `元素239的效果变得更好.`,
			cost: E("1.5e12366"),
		},
		{
			desc: `93号元素镎的软上限更弱.`,
			cost: E("1.5e1056"),
			et: true,
		},
		{
			desc: `解锁一个星系挑战设置.`,
			cost: E("5e42"),
			galQk: true,
		},
		{
			desc: `绿色色度以削弱的效果对六重折算生效.`,
			cost: E("1.5e12546"),
			effect() {
				let x = (tmp.qu.chroma_eff[1]||E(0)).add(10).log10().sqrt();
				return x
			},
			effDesc(x) { return format(x)+"x"; },
		},
		{
			desc: `绿色色度的软上限更弱.`,
			cost: E("1.5e1066"),
			et: true,
		},
		{
			desc: `降低星系挑战的目标.`,
			cost: E("1e44"),
			galQk: true,
		},
		{
			desc: `元素272的效果变得更好.`,
			cost: E("1.5e12746"),
		},
		{
			desc: `自动完成挑战14和15,以及移除挑战16的次数上限.`,
			cost: E("1.5e1071"),
			et: true,
		},
		{
			desc: `星系费米子的折算延迟1.5倍开始.`,
			cost: E("5e44"),
			galQk: true,
		},
		{
			desc: `永恒质量获得基于无限质量的加成.`,
			cost: E("1.5e13676"),
		},
		{
			desc: `使强化器的溢出弱化.`,
			cost: E("1.5e1126"),
			et: true,
		},
		{
			desc: `星系夸克加成转生质量.`,
			cost: E("1e47"),
			galQk: true,
			effect() {
				let x = player.galQk.add(1);
				return x
			},
			effDesc(x) { return format(x)+"x"; },
		},
		{
			desc: `绿色色度的软上限更弱.`,
			cost: E("1.5e15036"),
		},
		{
			desc: `移除挑战17的上限. 移除无限升级3的软上限.`,
			cost: E("1.5e1186"),
			et: true,
		},
		{
			desc: `星系费米子的折算延迟1.5倍开始.`,
			cost: E("5e49"),
			galQk: true,
		},
		{
			desc: `蓝色色度的软上限更弱. 移除挑战3，4，8效果的软上限.`,
			cost: E("1.5e15381"),
		},
		{
			desc: `元素232的效果变得更好.`,
			cost: E("1.5e1196"),
			et: true,
		},
		{
			desc: `自动获得每种星系粒子粒子，数量为分配星系夸克时增加数量的100%.`,
			cost: E("3e50"),
			galQk: true,
		},
		{
			desc: `大撕裂升级20变得更好.`,
			cost: E("1.5e15756"),
		},
		{
			desc: `元素232的效果变得更好.`,
			cost: E("1.5e1256"),
			et: true,
		},
		{
			desc: `使强化器的溢出弱化.`,
			cost: E("1.5e17056"),
		},
		{
			desc: `移除挑战18，19的上限.`,
			cost: E("1.5e1306"),
			et: true,
		},
		{
			desc: `星系碎片的效果也可以对星系玻色子生效.`,
			cost: E("2e55"),
			galQk: true,
		},
		{
			desc: `自动完成挑战16-18.`,
			cost: E("1.5e21056"),
		},
		{
			desc: `移除绿色色度的软上限.`,
			cost: E("1.5e1406"),
			et: true,
		},
		{
			desc: `[G-陶子]'的效果增强1.75倍.`,
			cost: E("5e61"),
			galQk: true,
		},
		{
			desc: `无限升级2的效果提升5.`,
			cost: E("1.5e24506"),
		},
		{
			desc: `自动完成挑战19.`,
			cost: E("1.5e1506"),
			et: true,
		},
		{
			desc: `减少超新星星系的需求.`,
			cost: E("1e64"),
			galQk: true,
		},
		{
			desc: `移除元阶层的折算. 辐射波的'元级别加成'以削弱的倍率削弱六重阶层的元折算.`,
			cost: E("1.5e25956"),
			effect() {
				let x = tmp.radiation.bs.eff[14].add(1).log10().add(1).log10().add(1).pow(0.5);
				return x
			},
			effDesc(x) { return format(x)+"x later"; },
		},
		{
			desc: `七重阶层的元折算延迟1.5倍开始.`,
			cost: E("1.5e1556"),
			et: true,
		},
		{
			desc: `削弱星系能量的软上限T.`,
			cost: E(2e66),
			galQk: true,
		},
		{
			desc: `移除黑洞的一重溢出.`,
			cost: E("1.5e28206"),
		},
		{
			desc: `元素173和174的效果变得更好.`,
			cost: E("1.5e1606"),
			et: true,
		},
		{
			desc: `星系碎片的效果也可以对星系U-费米子生效.`,
			cost: E(5e67),
			galQk: true,
		},
		{
			desc: `移除一些星系加成的软上限.`,
			cost: E("1.5e28906"),
		},
		{
			desc: `移除强化器的软上限.`,
			cost: E("1.5e1626"),
			et: true,
		},
		{
			desc: `解锁一个星系挑战设置.`,
			cost: E(1e69),
			galQk: true,
		},
		{
			desc: `降低星系挑战的目标.`,
			cost: E(1e69),
			galQk: true,
		},
		{
			desc: `挑战20的效果变得更好.`,
			cost: E("1.5e29906"),
		},
		{
			desc: `绿色色度的效果变得更好.`,
			cost: E("1.5e1666"),
			et: true,
		},
		{
			desc: `降低星系挑战的目标.`,
			cost: E(1e69),
			galQk: true,
		},
		{
			desc: `移除宇宙射线的一些软上限.`,
			cost: E("1.5e30156"),
		},
		{
			desc: `声望的元折算延迟2倍开始.`,
			cost: E("1.5e1669"),
			et: true,
		},
		{
			desc: `星系碎片加成星系夸克.`,
			cost: E(1e72),
			galQk: true,
			effect() {
				let x = player.gc.shard.add(1).sqrt();
				return x
			},
			effDesc(x) { return format(x)+"x"; },
		},
		{
			desc: `R移除 [中微子]的软上限.`,
			cost: E("1.5e31056"),
		},
		{
			desc: `无限升级9的效果变得更好.`,
			cost: E("1.5e1756"),
			et: true,
		},
		{
			desc: `星系费米子的折算延迟1.5倍开始.`,
			cost: E("1e75"),
			galQk: true,
		},
		{
			desc: `C20 的效果变得更好.`,
			cost: E("1.5e32756"),
		},
		{
			desc: `七重阶层的元折算延迟1.5倍开始.`,
			cost: E("1.5e1836"),
			et: true,
		},
		{
			desc: `星系碎片的效果也可以对星系辐射波的基数生效.`,
			cost: E("3e78"),
			galQk: true,
		},
		{
			desc: `电子的第二个效果变得更好.`,
			cost: E("1.5e36556"),
		},
		{
			desc: `星系暗能量和星系玻色子的效果变得更好.`,
			cost: E("3e81"),
			galQk: true,
		},
		{
			desc: `改变挑战1，5，7的效果.`,
			cost: E("1.5e37556"),
		},
		{
			desc: `元素161的效果立方.`,
			cost: E("1.5e2056"),
			et: true,
		},
		{
			desc: `星系碎片的效果再次对星系辐射波的基数生效.`,
			cost: E("1e83"),
			galQk: true,
		},
		{
			desc: `C18 的效果变得更好.`,
			cost: E("1.5e38206"),
		},
		{
			desc: `熵消耗^2削弱75%. 移除一些熵的软上限.`,
			cost: E("1.5e2056"),
			et: true,
		},
		{
			desc: `星系能量的软上限更弱.`,
			cost: E("2e84"),
			galQk: true,
		},
		{
			desc: `粒子能量的第一个效果平方.`,
			cost: E("1.5e57386"),
		},
		{
			desc: `中子能量的第二个效果变得更好.`,
			cost: E("1.5e2156"),
			et: true,
		},
		{
			desc: `熵折算加成超新星星系.`,
			cost: E("4e85"),
			galQk: true,
		},
		{
			desc: `时间加速的效果变得更好.`,
			cost: E("1.5e64256"),
		},
		{
			desc: `原子能量的软上限更弱.`,
			cost: E("1.5e2216"),
			et: true,
		},
		{
			desc: `解锁新的层级.`,
			cost: E("5e86"),
			galQk: true,
		},
		{
			desc: `元素173和174的效果变得更好.`,
			cost: E("1.5e70056"),
		},
		{
			desc: `七重阶层的元折算延迟1.5倍开始.`,
			cost: E("1.5e2556"),
			et: true,
		},
		{
			desc: `贝塔粒子效果的软上限在星系挑战中削弱.获得双倍星系碎片.`,
			cost: E("1e100"),
			galQk: true,
		},
		{
			desc: `奇异助推中的'原子助推'加成夸克获取.`,
			cost: E("eee12"),
			qk: true,
		},
		{
			desc: `元素231效果更好.`,
			cost: E("2e127"),
			galQk: true,
		},
		{
			desc: `时间碎片的效果变得更好.`,
			cost: E("1.5e3556"),
			et: true,
		},
		{
			desc: `奇异物质助推器增强20%.`,
			cost: E("2e21"),
			exotic: true,
		},
		{
			desc: `元素173和174的效果变得更好.`,
			cost: E("1.5e134056"),
		},
		{
			desc: `中子的第二个效果平方.`,
			cost: E("ee1.5e12"),
			qk: true,
		},
		{
			desc: `星系粒子的效果变得更好.`,
			cost: E("5e128"),
			galQk: true,
		},
		{
			desc: `量子之前所有资源获取速度加成黑暗之影.`,
			cost: E("1e10"),
			ds: true,
			effect() {
				let x = tmp.preQUGlobalSpeed.add(1).log10().sqrt();
				return x
			},
			effDesc(x) { return format(x)+"x"; },
		},
		{
			desc: `声望的元折算延迟2倍开始.`,
			cost: E("1.5e3756"),
			et: true,
		},
		{
			desc: `奇异物质加成黑暗射线.`,
			cost: E("2e23"),
			exotic: true,
			effect() {
				let x = player.exotic.points.add(10).log10().pow(2);
				return x
			},
			effDesc(x) { return format(x)+"x"; },
		},
		{
			desc: `星系原子的效果变得更好.`,
			cost: E("1.5e142056"),
		},
		{
			desc: `夸克对星系夸克的获取变得更好.`,
			cost: E("ee2e12"),
			qk: true,
		},
		{
			desc: `星系U-费米子的效果变得更好. 星系费米子的需求变得更低.`,
			cost: E("5e141"),
			galQk: true,
		},
		{
			desc: `为黑暗之影解锁一个新的效果.`,
			cost: E("1e20"),
			ds: true,
		},
		{
			desc: `时间碎片的效果变得更好.`,
			cost: E("1.5e3856"),
			et: true,
		},
		{
			desc: `加倍转生降幅器效果.`,
			cost: E("2e24"),
			exotic: true,
		},
		{
			desc: `移除挑战1-19的硬化和疯狂折算.`,
			cost: E("1.5e150056"),
		},
		{
			desc: `解锁元素充能(看元素阶层1,请点变色的,下面的黄字是需求).`,
			cost: E("ee2.7777e12"),
			qk: true,
		},
		{
			desc: `充能元素加成星系夸克.`,
			cost: E("5e148"),
			galQk: true,
			effect() {
				let x = E(1.5).pow(player.atom.chargedElements.length)
				return x
			},
			effDesc(x) { return format(x)+"x"; },
		},
		{
			desc: `解锁黑暗之影的一个新的效果.`,
			cost: E("1e24"),
			ds: true,
		},
		{
			desc: `在星系或奇异重置时，保留永恒质量与永恒次数。这b玩意仅需6.9e4200uni的永恒质量，快来抢购吧！（如果你发现元素很难买，记得看看奇异助推器）)`,
			cost: E("1.035e4257"),
			et: true,
		},
		{
			desc: `奇异物质助推器增强10%.`,
			cost: E("2e28"),
			exotic: true,
		},
		{
			desc: `粒子能量的第一个效果平方.`,
			cost: E("1.5e173056"),
		},
		{
			desc: `星系夸克对于U-夸克的加成变得更好.`,
			cost: E("ee1e13"),
			qk: true,
		},
		{
			desc: `解锁超新星星团.`,
			cost: E("1e167"),
			galQk: true,
		},
		{
			desc: `死寂碎片加成黑暗阴影的获取.`,
			cost: E("1e35"),
			ds: true,
			effect() {
				let x = player.qu.rip.amt.add(1).log10().add(1).log10().add(1).pow(2);
				return x
			},
			effDesc(x) { return format(x)+"x"; },
		},
		{
			desc: `永恒质量加成黑暗射线的获取.`,
			cost: E("1.5e4656"),
			et: true,
			effect() {
				let x = player.et.points.add(10).log10();
				return x
			},
			effDesc(x) { return format(x)+"x"; },
		},
		{
			desc: `奇异元助推的效果变得更强.`,
			cost: E("1e34"),
			exotic: true,
		},
		{
			desc: `加速器效果的二重软上限变得更弱.`,
			cost: E("1.5e221356"),
		},
		{
			desc: `星系粒子的效果变得更好.`,
			cost: E("ee1.9e13"),
			qk: true,
		},
		{
			desc: `自动完成挑战20.`,
			cost: E("3e173"),
			galQk: true,
		},
		{
			desc: `解锁黑暗之影一个新的效果.`,
			cost: E("1e45"),
			ds: true,
		},
		{
			desc: `永恒质量加成奇异物质和黑暗射线的获取.`,
			cost: E("1.5e4906"),
			et: true,
			effect() {
				let x = player.et.points.add(10).log10();
				return x
			},
			effDesc(x) { return format(x)+"x"; },
		},
		{
			desc: `减少超新星星系的需求.`,
			cost: E("3e39"),
			exotic: true,
		},
		{
			desc: `挑战20的效果变得更好.`,
			cost: E("1.5e270056"),
		},
		{
			desc: `移除熵辐射^2的折算. 一些熵效果变得更好.`,
			cost: E("ee5e13"),
			qk: true,
		},
		{
			desc: `星系粒子的效果变得更好.`,
			cost: E("1e184"),
			galQk: true,
		},
		{
			desc: `解锁黑暗之影一个新的效果.`,
			cost: E("1e50"),
			ds: true,
		},
		{
			desc: `永恒质量加成黑暗之影的获取.`,
			cost: E("1.5e5106"),
			et: true,
			effect() {
				let x = player.et.points.add(10).log10();
				return x
			},
			effDesc(x) { return format(x)+"x"; },
		},
		{
			desc: `解锁奇异次数加成器.`,
			cost: E("2e41"),
			exotic: true,
		},
		{
			desc(){
				if(!hasElement(403))return "403 Forbidden";
				return "声望的元折算延迟2倍开始.";
			},
			cost: E("1.5e300056"),
		},
		{
			desc(){
				if(!hasElement(404))return "404 Not Found";
				return "玻色子升级的效果变得更好.";
			},
			cost: E("ee5.5555e13"),
			qk: true,
		},
		{
			desc: `星系夸克加成黑暗之影的获取.`,
			cost: E("1e190"),
			galQk: true,
			effect() {
				let x = player.galQk.add(10).log10();
				return x
			},
			effDesc(x) { return format(x)+"x"; },
		},
		{
			desc: `解锁黑暗射线的一个新的效果.`,
			cost: E("1e55"),
			ds: true,
		},
		{
			desc: `星系费米子的究极折算延迟1.5倍开始.`,
			cost: E("1.5e5406"),
			et: true,
		},
		{
			desc: `奇异助推效果增强10%.`,
			cost: E("2e47"),
			exotic: true,
		},
		{
			desc: `挑战20的效果变得更好.`,
			cost: E("1.5e378056"),
		},
		{
			desc: `降幅器的超级折算削弱4%.`,
			cost: E("ee2.3e14"),
			qk: true,
		},
		{
			desc: `星系粒子的效果变得更好.`,
			cost: E("1e205"),
			galQk: true,
		},
		{
			desc: `黑暗之影的一些效果变得更好.`,
			cost: E("1e58"),
			ds: true,
		},
		{
			desc: `星系粒子的效果变得更好. 中子的第一个效果平方.`,
			cost: E("1e213"),
			galQk: true,
		},
		{
			desc: `解锁深渊之渍.`,
			cost: E("1e60"),
			ds: true,
		},
		{
			desc: `费米子的元折算弱化99%.`,
			cost: E("1.5e6106"),
			et: true,
		},
		{
			desc: `奇异元助推的效果x1.5.`,
			cost: E("1e53"),
			exotic: true,
		},
		{
			desc: `挑战20的效果变得更好.`,
			cost: E("1.5e457056"),
		},
		{
			desc: `时间加速的元折算延迟至原来的10次方.`,
			cost: E("ee1.6e15"),
			qk: true,
		},
		{
			desc: `星系粒子的效果变得更好.`,
			cost: E("1e235"),
			galQk: true,
		},
		{
			desc: `解锁深渊之渍一个新的效果.`,
			cost: E("2e70"),
			ds: true,
		},
		{
			desc: `改变挑战1的效果.六重阶层的元折算延迟1e100倍开始.`,
			cost: E("1.5e7331"),
			et: true,
		},
		{
			desc: `减少超新星星系的需求.`,
			cost: E("1e59"),
			exotic: true,
		},
		{
			desc: `解锁星系挑战一个新的挑战设置.当你在星系挑战时,每秒获得1g质量与1量子前的全局速度加成 (不会受到任何东西的影响).`,
			cost: E("1.5e684056"),
		},
		{
			desc: `六重阶层的元折算基于阶层推迟.`,
			cost: E("ee1.6666e16"),
			qk: true,
			effect() {
				let x = overflow(expMult(player.ranks.tier.pow(1e-19).add(100),3),"1e100000",10/3);
				if(hasElement(439))x = x.mul(E("e3e8").pow(player.ranks.tier.add(10).log10().add(10).log10()));
				return x
			},
			effDesc(x) { return format(x)+"x later"; },
		},
		{
			desc: `星系粒子的效果变得更好.`,
			cost: E("1e249"),
			galQk: true,
		},
		{
			desc: `解锁深渊之渍一个新的效果.`,
			cost: E("1e73"),
			ds: true,
		},
		{
			desc: `贝塔[B]粒子的效果x10.`,
			cost: E("1.5e7706"),
			et: true,
		},
		{
			desc: `黑暗射线的第二个效果变为^2.5`,
			cost: E("1e65"),
			exotic: true,
		},
		{
			desc: `挑战20的效果变得更好.`,
			cost: E("1.5e800056"),
		},
		{
			desc: `移除无限升级5的软上限.`,
			cost: E("ee3.3333e16"),
			qk: true,
		},
		{
			desc: `时间碎片的效果变得更好.`,
			cost: E("1.5e7981"),
			et: true,
		},
		{
			desc: `奇异物质助推器增强10%.`,
			cost: E("4e73"),
			exotic: true,
		},
		{
			desc: `挑战20的效果变得更好.`,
			cost: E("1.5e888944"),
		},
		{
			desc: `弱化加速器效果的二重软上限.`,
			cost: E("ee1e17"),
			qk: true,
		},
		{
			desc: `Unlock a new Galactic Challenge modifier. +5 to Galactic Challenge Difficulty Cap. Square Galactic Shard effect.`,
			cost: E("3e271"),
			galQk: true,
		},
		{
			desc: `解锁深渊之渍一个新的效果.`,
			cost: E("1e82"),
			ds: true,
		},
		{
			desc: `时间碎片的效果变得更好.`,
			cost: E("1.5e9056"),
			et: true,
		},
		{
			desc: `Unlock the 21st Challenge.`,
			cost: E("3e75"),
			exotic: true,
		},
		{
			desc: `Element 424 is better.`,
			cost: E("1.5e1000056"),
		},
		{
			desc: `Exotic Prestige Level is 5% weaker.`,
			cost: E("ee2.1e17"),
			qk: true,
		},
		{
			desc: `星系粒子的效果变得更好.`,
			cost: E("2e286"),
			galQk: true,
		},
		{
			desc: `Each bought element multiply 深渊之渍 gain by 1.1.`,
			cost: E("6e83"),
			ds: true,
			effect() {
				return E(1.1).pow(player.atom.elements.length);
			},
			effDesc(x) { return format(x)+"x" },
		},
		{
			desc: `Accelerator effect softcap^2 is weaker.`,
			cost: E("1.5e10081"),
			et: true,
		},
		{
			desc: `奇异物质助推器 'Star Boost' affects Star Generators.`,
			cost: E("1e78"),
			exotic: true,
		},
		{
			desc: `永恒质量增加深渊之渍的获取.`,
			cost: E("1.5e10181"),
			et: true,
			effect() {
				let x = player.et.points.add(10).log10();
				return x
			},
			effDesc(x) { return format(x)+"x" },
		},
		{
			desc: `Exotic Meta-Boost is 1.2x stronger.`,
			cost: E("1e78"),
			exotic: true,
		},
		{
			desc: `无限升级 24 is better.`,
			cost: E("1.5e1130056"),
		},
		{
			desc: `Exotic Prestige Level is weaker based on 奇异物质加成黑暗射线bove 1e80 EM).`,
			cost: E("ee5e17"),
			qk: true,
			effect() {
				if(player.exotic.points.gte(1e80))return E(0.97).pow(player.exotic.points.add(10).log10().div(24.185));
				return E(0.97).pow(player.exotic.points.add(10).log10().pow(0.273));
			},
            effDesc(x) { return format(E(1).sub(x).mul(100))+"% weaker" },
		},
		{
			desc: `星系粒子的效果变得更好.`,
			cost: E("5e294"),
			galQk: true,
		},
		{
			desc: `Unlock Dark Run.`,
			cost: E("1e87"),
			ds: true,
		},
		{
			desc: `永恒质量 boost Glyphic Mass gain.`,
			cost: E("1.5e10656"),
			et: true,
			effect() {
				let x = player.et.points.add(10).log10().sqrt();
				if(hasElement(463))x = x.pow(2);
				return x
			},
			effDesc(x) { return format(x)+"x"; },
		},
		{
			desc: `Permanently Remove Meta-Pent scaling.`,
			cost: E("1e87"),
			exotic: true,
		},
		{
			desc: `Reduce C21 goal.`,
			cost: E("1.5e1279056"),
		},
		{
			desc: `Break Dilation Upgrade 5 is applied to Meta-Hex scaling.`,
			cost: E("ee2.4444e18"),
			qk: true,
		},
		{
			desc: `Galactic Quarks is added to base Infinity Mass gain formula.`,
			cost: E(Number.MAX_VALUE),
			galQk: true,
		},
		{
			desc: `Dark Ray's 2nd 的效果变得更好. 解锁黑暗射线的一个新的效果.`,
			cost: E("1e99"),
			ds: true,
		},
		{
			desc: `时间碎片的效果变得更好.`,
			cost: E("1.5e15056"),
			et: true,
		},
		{
			desc: `Exotic Meta-Boost is better.`,
			cost: E("2e98"),
			exotic: true,
		},
		{
			desc: `Elements 173-174 变得更好.`,
			cost: E("1.5e1900056"),
		},
		{
			desc: `[G-Neutrino] affects Meta-Hex at a reduced rate.`,
			cost: E("ee8e19"),
			qk: true,
			effect() {
				let x = player.supernova.fermions.tiers[3][3].add(1).pow(2);
				return x
			},
			effDesc(x) { return format(x)+"x later"; },
		},
		{
			desc: `Accelerator Power Softcap^2 is weaker.`,
			cost: E("ee8.1e19"),
			qk: true,
		},
		{
			desc: `星系粒子的效果变得更好.`,
			cost: E("1e348"),
			galQk: true,
		},
		{
			desc: `Element 451 is better.`,
			cost: E("1.5e16856"),
			et: true,
		},
		{
			desc: `奇异物质加成雕文质量获取.`,
			cost: E("1e108"),
			exotic: true,
			effect() {
				let x = player.exotic.points.add(10).log10();
				return x
			},
			effDesc(x) { return format(x)+"x"; },
		},
		{
			desc: `挑战20的效果变得更好.`,
			cost: E("1.5e2100056"),
		},
		{
			desc: `Exotic Prestige Level starts +42,000 later.`,
			cost: E("ee3.3333e20"),
			qk: true,
		},
		{
			desc: `Divide Supernova Galaxies Requirement by 40. Unlock a new effect of Supernova Galaxies.`,
			cost: E("2e367"),
			galQk: true,
		},
		{
			desc: `Dark Shadow's 7th 的效果变得更好.`,
			cost: E("1e109"),
			ds: true,
		},
		{
			desc: `Galactic Dark Matter and Galactic Bosons effects 变得更好.`,
			cost: E("1.5e20056"),
			et: true,
		},
		{
			desc: `Meta-Hex starts later based on 奇异物质加成黑暗射线6`,
			exotic: true,
			cost: E("6e116"),
			effect() {
				let x = player.exotic.points.add(10).log10();
				return x
			},
			effDesc(x) { return format(x)+"x"; },
		},
		{
			desc: `无限升级24的效果变得更好.`,
			cost: E("1.5e2600056"),
		},
		{
			desc: `Tickspeed Power multiply Booster Power.`,
			cost: E("ee2e21"),
			qk: true,
		},
		{
			desc: `星系粒子的效果变得更好.`,
			cost: E("1e396"),
			galQk: true,
		},
		{
			desc: `解锁黑暗之影一个新的效果.`,
			cost: E("5e113"),
			ds: true,
		},
		{
			desc: `Accelerator Effect softcap^2 is weaker.`,
			cost: E("1.5e21056"),
			et: true,
		},
		{
			desc: `Unlock the 22nd Challenge.`,
			cost: E("2e124"),
			exotic: true,
		},
		{
			desc: `削弱挑战21的目标.`,
			cost: E("1.5e2900056"),
		},
		{
			desc: `使强化器的溢出弱化.`,
			cost: E("ee1.25e22"),
			qk: true,
		},
		{
			desc: `Galactic Power boost Rage Power gain.`,
			cost: E("1e425"),
			galQk: true,
		},
		{
			desc: `Dark Ray's 2nd 的效果变得更好.`,
			cost: E("3e116"),
			ds: true,
		},
		{
			desc: `The softcap of Element 93 is weaker.`,
			cost: E("1.5e22456"),
			et: true,
		},
		{
			desc: `In C22, Atom gain is based on Mass instead of Black Hole.`,
			cost: E("3e132"),
			exotic: true,
		},
		{
			desc: `You can change Tier 2 Elements(看元素阶层2).`,
			cost: E("1.5e3300056"),
		},
		{
			desc: `Galactic Shards gain formula is better.`,
			cost: E("ee1.8888e22"),
			qk: true,
		},
		{
			desc: `星系粒子的效果变得更好. Galactic Quarks Post-1e100 boost Glyphic Mass gain.`,
			cost: E("5e447"),
			galQk: true,
			effect() {
				let x = player.galQk.max(1e100).log10().sub(99);
				return x
			},
			effDesc(x) { return format(x)+"x"; },
		},
		{
			desc: `Unlock The Matters.`,
			cost: E("5e118"),
			ds: true,
		},
		{
			desc: `Unlock the 奇异物质加成黑暗射线ters tab.`,
			cost: uni('e25150'),
			et: true,
		},
		{
			desc: `Exotic Meta-Boost is better.`,
			cost: E("1e145"),
			exotic: true,
		},
		{
			desc: `C20的效果变得更好.`,
			cost: uni('e4900000'),
		},
		{
			desc: `Add 0.4 to Matter Exponent.`,
			cost: E("ee9e23"),
			qk: true,
		},
		{
			desc: `Collapsed Stars 的效果变得更好.`,
			cost: E("5e479"),
			galQk: true,
		},
		{
			desc: `解锁黑暗之影一个新的效果.`,
			cost: E("5e124"),
			ds: true,
		},
		{
			desc: `Add 0.3 to Matter Exponent.`,
			cost: uni('e27950'),
			et: true,
		},
		{
			desc: `Exotic Meta-Boost is better.`,
			cost: E("1e158"),
			exotic: true,
		},
		{
			desc: `Double the 奇异物质加成黑暗射线ters tab.`,
			cost: uni('e6100000'),
		},
		{
			desc: `Dark Shadow's 3rd 的效果变得更好.`,
			cost: E("ee1.6666e25"),
			qk: true,
		},
		{
			desc: `Collapsed Stars 的效果变得更好.`,
			cost: E("1e515"),
			galQk: true,
		},
		{
			desc: `Double 9th Dark Shadow Effect.`,
			cost: E("1e127"),
			ds: true,
		},
		{
			desc: `Accelerator Effect softcap^2 is weaker.`,
			cost: uni('e36800'),
			et: true,
		},
		{
			desc(){
				if(!hasElement(500))return "500 Internal Server Error";
				return "Exotic Meta-Boost is better.";
			},
			cost: E("1e171"),
			exotic: true,
		},
		{
			desc: `星系粒子的效果变得更好.`,
			cost: uni('e9000000'),
		},
		{
			desc(){
				if(!hasElement(502))return "502 Bad Gateway";
				return "Collapsed Stars 的效果变得更好.";
			},
			cost: E("ee5e27"),
			qk: true,
		},
		{
			desc(){
				if(!hasElement(503))return "503 Service Unavailable";
				return "Each Galactic Fermion gain an additional effect when its tier is above 100.";
			},
			cost: E("1e567"),
			galQk: true,
		},
		{
			desc(){
				if(!hasElement(504))return "504 Gateway Time-out";
				return "Dark Ray's 2nd 的效果变得更好.";
			},
			cost: E("1e132"),
			ds: true,
		},
		{
			desc: `Super Galactic Fermion Tiers starts 1.2x later.`,
			cost: uni("e47500"),
			et: true,
		},
		{
			desc: `Exotic Meta-Boost is better.`,
			cost: E("1e200"),
			exotic: true,
		},
		{
			desc: `星系粒子的效果变得更好.`,
			cost: uni('e10000000'),
		},
		{
			desc: `Each bought element after 500 add Matter Exponent by 0.02.`,
			cost: E("ee5.4e28"),
			qk: true,
			effect() {
				let x = (Math.max((player.atom.elements.length-500)*0.02,0));
				return x
				
			},
			effDesc(x) { return "+"+format(x); },
		},
		{
			desc: `星系粒子的效果变得更好.`,
			cost: E("3e612"),
			galQk: true,
		},
		{
			desc: `Unlock more Neutron Tree upgrades.`,
			cost: E("2e137"),
			ds: true,
		},
		{
			desc: `Super Galactic Fermion Tiers Starts 1.25x later`,
			cost: E("5e621"),
			galQk: true,
		},
		{
			desc: `解锁深渊之渍一个新的效果.`,
			cost: E("2e142"),
			ds: true,
		},
		{
			desc: `永恒质量 boost Magenta Matter gain.`,
			cost: uni("e61500"),
			et: true,
			effect() {
				let x = player.et.points.add(1).log10().add(1).log10().add(1);
				return x
			},
			effDesc(x) { return format(x)+"x"; },
		},
		{
			desc: `Dark Ray's 2nd 的效果变得更好.`,
			cost: E("1e221"),
			exotic: true,
		},
		{
			desc: `Collapsed Stars 的效果变得更好.`,
			cost: uni('e15555555'),
		},
		{
			desc: `使强化器的溢出弱化.`,
			cost: E("ee1.5e32"),
			qk: true,
		},
		{
			desc: `Purple Matter boost Stardust gain.`,
			cost: E("1e727"),
			galQk: true,
		},
		{
			desc: `Dark Ray's 2nd 的效果变得更好.`,
			cost: E("2e152"),
			ds: true,
		},
		{
			desc: `Change the effect of C5.`,
			cost: uni("e84000"),
			et: true,
		},
		{
			desc: `Meta-Fermion Tier scales later based on Primordium Theorems.`,
			cost: E("5e268"),
			exotic: true,
			effect() {
				let x = player.qu.prim.theorems.div(1e7).add(1);
				return x
			},
			effDesc(x) { return format(x)+"x later"; },
		},
		{
			desc: `Stronger Overflow is better.`,
			cost: uni('e22600000'),
		},
		{
			desc: `Collapsed Stars 的效果变得更好.`,
			cost: E("ee1.6666e35"),
			qk: true,
		},
		{
			desc: `星系粒子的效果变得更好.`,
			cost: E("2e782"),
			galQk: true,
		},
		{
			desc: `解锁黑暗射线的一个新的效果.`,
			cost: E("5e156"),
			ds: true,
		},
		{
			desc: `Accelerator Effect Softcap^2 is weaker.`,
			cost: uni("e100000"),
			et: true,
		},
		{
			desc: `Remove the softcaps of Rage Power Upgrades 8, 11 and 12. Rage Power Upgrade 22 is better.`,
			cost: E("4e282"),
			exotic: true,
		},
		{
			desc: `C20的效果变得更好.`,
			cost: uni('e29000000'),
		},
		{
			desc: `Meta-Fermion Tier is weaker based on Primordium Theorems.`,
			cost: E("ee2e37"),
			qk: true,
			effect() {
				let x = player.qu.prim.theorems.add(1).pow(-1);
				return x
			},
			effDesc(x) { return "Strength of Meta-Fermion Tier scaling /"+format(x.pow(-1)); },
		},
		{
			desc: `Remove a softcap of Beta Particles Effect.`,
			cost: uni("e110000"),
			et: true,
		},
		{
			desc: `Collapsed Stars gain a new effect.`,
			cost: E("4e282"),
			exotic: true,
		},
		{
			desc: `Increase Collapsed Star's first effect. Collapsed Star's first and second effects are permanently maxed.`,
			cost: uni('e37500000'),
		},
		{
			desc: `Accelerator Effect Softcap^2 is weaker.`,
			cost: E("ee1.1111e44"),
			qk: true,
		},
		{
			desc: `星系粒子的效果变得更好.`,
			cost: E("1e1085"),
			galQk: true,
		},
		{
			desc: `解锁x轴生成器.`,
			cost: E("1e174"),
			ds: true,
		},
		{
			desc: `Pre-Quantum Global Speed boost X-Axion Generators Power.`,
			cost: uni("e207000"),
			et: true,
			effect() {
				let x = tmp.preQUGlobalSpeed.add(10).log10().add(10).log10();
				return x
			},
			effDesc(x) { return format(x)+"x"; },
		},
		{
			desc: `奇异物质加成黑暗射线ators Power.`,
			cost: E("1e356"),
			exotic: true,
			effect() {
				let x = player.exotic.points.add(10).log10().sqrt();
				return x
			},
			effDesc(x) { return format(x)+"x"; },
		},
		{
			desc: `使强化器的溢出弱化.`,
			cost: uni('e69000000'),
		},
		{
			desc: `C20的效果变得更好.`,
			cost: E("ee1e46"),
			qk: true,
		},
		{
			desc: `Divide Supernova Galaxies Requirement by 125.`,
			cost: E("1e1127"),
			galQk: true,
		},
		{
			desc: `Unlock Y-Axion Generators.`,
			cost: E("2e176"),
			ds: true,
		},
		{
			desc: `Accelerator Effect Softcap^2 is weaker.`,
			cost: uni("e270000"),
			et: true,
		},
		{
			desc: `Unlock Final Star Shards.`,
			cost: E("5e391"),
			exotic: true,
		},
		{
			desc: `Accelerator Effect Softcap^2 is weaker.`,
			cost: uni("e300000"),
			et: true,
		},
		{
			desc: `Final Star Shards boost Matter Exponent.`,
			cost: E("1e404"),
			exotic: true,
			effect() {
				let x = player.exotic.fss.div(10);
				return x
			},
			effDesc(x) { return "+"+format(x); },
		},
		{
			desc: `Unlock the 23rd Challenge.`,
			cost: uni('e123456789'),
		},
		{
			desc: `2nd Black Hole Overflow effect is weaker.`,
			cost: E("ee7.7777e52"),
			qk: true,
		},
		{
			desc: `星系粒子的效果变得更好.`,
			cost: E("1e1440"),
			galQk: true,
		},
		{
			desc: `Add (next matter)^y to matter gain formula, y is based on FSS.`,
			cost: E("1e218"),
			ds: true,
		},
		{
			desc: `时间碎片的效果变得更好.`,
			cost: uni("e455000"),
			et: true,
		},
		{
			desc: `奇异物质助推器s are stronger based on bought elements, except Meta-Boost. Exotic Meta-Boost is 50% weaker.`,
			cost: E("1e452"),
			exotic: true,
			effect() {
				let x = player.atom.elements.length/2500+1;
				return x
			},
			effDesc(x) { return format(player.atom.elements.length/25)+"% stronger" },
		},
		{
			desc: `Accelerator Effect Softcap is weaker.`,
			cost: uni('e2.4e8'),
		},
		{
			desc: `挑战21的效果变得更好.`,
			cost: E('ee3e61'),
			qk: true,
		},
		{
			desc: `星系粒子的效果变得更好.`,
			cost: E("1e1675"),
			galQk: true,
		},
		{
			desc: `Unlock more Neutron Tree Upgrades, Z Axion Generators and Axionic Space.`,
			cost: E("2e226"),
			ds: true,
		},
		{
			desc: `Reduce Supernova Requirements. Quantum Challenge Modifier 'Extreme Scaling' doesn't apply to Supernova. Remove Beta Particle effect softcap in Galactic Challenge.`,
			cost: uni("e580000"),
			et: true,
		},
		{
			desc: `Unlock Axionic Tree. (in Neutron Tree)`,
			cost: E("1e500"),
			exotic: true,
		},
		{
			desc: `使强化器的溢出弱化.`,
			cost: mlt('1.91'),
		},
		{
			desc: `Remove Pre-Quantum Global Speed cap in C20. Auto-Completions of C20 is better.`,
			cost: E('eee82'),
			qk: true,
		},
	],
    /*
    {
        desc: `Placeholder.`,
        cost: EINF,
        effect() {
            let x = E(1)
            return x
        },
        effDesc(x) { return format(x)+"x" },
    },
    */
    getUnlLength() {
		if(hasElement(545))return 558;
		if(hasElement(542))return 545;
		if(hasElement(534))return 542;
		if(hasElement(486)&&player.superCluster.gte(14))return 534;
		if(hasElement(486))return 516;
		if(hasElement(476))return 486;
		if(hasElement(450))return 476;
		if(hasElement(438))return 450;
		if(hasElement(380))return 438;
		if(hasUpgrade("atom",25))return 380;
		
		if(player.exotic.times.gte(1))return 362;
		if(hasElement(291))return 359;
		if(hasElement(290))return 291;
		if(player.superGal.gte(10))return 290;
		if(player.superGal.gte(1))return 218;
        let u = 4
        if (quUnl()) u = 77+3
        else {
            if (player.supernova.times.gte(1)) u = 49+5
            else {
                if (player.chal.comps[8].gte(1)) u += 14
                if (hasElement(18)) u += 3
                if (MASS_DILATION.unlocked()) u += 15
                if (STARS.unlocked()) u += 18
            }
            if (player.supernova.post_10) u += 3
            if (player.supernova.fermions.unl) u += 10
            if (tmp.radiation.unl) u += 10
        }
        if (PRIM.unl()) u += 3
        if (hasTree('unl3')) u += 3
        if (player.qu.rip.first) u += 9
        if (hasUpgrade("br",9)) u += 23 // 23
		if (hasUpgrade("atom",16)) u += 16
		if (hasElement(134)) u += 21
        if (player.chal.comps[13].gte(4)) u += 13
        if (player.chal.comps[16].gte(3)) u += 24
        if (player.chal.comps[17].gte(3)) u += 13
        if (player.chal.comps[18].gte(3)) u += 4
        if (player.chal.comps[19].gte(8)) u += 9
        return u
    },
}

const MAX_ELEM_TIERS = 4

function getElementId(x) {
    let log = Math.floor(Math.log10(x))
    let list = ["n", "u", "b", "t", "q", "p", "h", "s", "o", "e"]
    let r = ""
    for (var i = log; i >= 0; i--) {
        let n = Math.floor(x / Math.pow(10, i)) % 10
        if (r == "") r = list[n].toUpperCase()
        else r += list[n]
    }
    return r
}

function getElementName(x) {
	return x+"号元素";
}

function WE(a,b) { return 2*(a**2-(a-b)**2) }

for (let x = 2; x <= MAX_ELEM_TIERS; x++) {
    let [ts,te] = [ELEMENTS.exp[x-1],ELEMENTS.exp[x]]
    ELEMENTS.max_hsize[x-1] = 11 + 4*x
    let m = 'xx1xxxxxxxxxxxxxxxxvxx2xxxxxxxxxxxxxxxxv_v'

    for (let y = x; y >= 1; y--) {
        let k = 10 + 4 * y
        m += "1"+'x'.repeat(k)+"v"
        m += "2"+'x'.repeat(k)
        if (y > 1) m += "v_v"
    }

    for (let y = ts+1; y <= te; y++) {
        ELEMENTS.names.push(getElementId(y))
        ELEMENTS.fullNames.push(getElementName(y))
        if (!ELEMENTS.upgs[y]) ELEMENTS.upgs.push({
            desc: `Placeholder.`,
            cost: EINF,
        })
    }

    ELEMENTS.map.push(m)
}

function hasElement(x) { return player.atom.elements.includes(x) }
function hasChargedElement(x) { return player.atom.chargedElements.includes(x) }


function setupElementsHTML() {
    let elements_table = new Element("elements_table")
	let table = ""
    let num = 0
    for (let k = 1; k <= MAX_ELEM_TIERS; k++) {
        let hs = `style="width: ${50*ELEMENTS.max_hsize[k-1]}px; margin: auto"`
        let n = 0, p = (k+3)**2*2, xs = ELEMENTS.exp[k-1], xe = ELEMENTS.exp[k]
        table += `<div id='elemTier${k}_div'><div ${hs}><div class='table_center'>`
        for (let i = 0; i < ELEMENTS.map[k-1].length; i++) {
            let m = ELEMENTS.map[k-1][i]
            if (m=='v') table += `</div><div class="table_center">`
            else if (m=='_' || !isNaN(Number(m))) table += `<div ${ELEMENTS.la[m]!==undefined&&k==1?`id='element_la_${m}'`:""} style="width: 50px; height: 50px">${ELEMENTS.la[m]!==undefined?"<br>"+ELEMENTS.la[m]:""}</div>`
            else if (m=='x') {
                num++
                table += ELEMENTS.upgs[num]===undefined?`<div style="width: 50px; height: 50px"></div>`
                :`<button class="elements ${num == 118 ? 'final' : ''}" id="elementID_${num}" onclick="ELEMENTS.buyUpg(${num}); ssf[0]('${ELEMENTS.names[num]}')" onmouseover="tmp.elements.choosed = ${num}" onmouseleave="tmp.elements.choosed = 0"><div style="font-size: 12px;">${num}</div>${ELEMENTS.names[num]}</button>`
                if (k == 1) {
                    if (num==57 || num==89) num += 14
                    else if (num==71) num += 18
                    else if (num==118) num = 57
                    else if (num==103) num = 118
                } else {
                    //console.log(num,p)
                    if (n == 0) {
                        if (num == xs + 2 || num == xs + p + 2) num += p - 18
                        else if (num == xe) {
                            num = xs + 2
                            n++
                        }
                    } else {
                        if (num == xs + WE(k+3,n) + 2) num = xs + p + WE(k+3,n-1) + 2
                        else if (num == xe - 16) num = xe
                        else if (num == xs + p + WE(k+3,n) + 2) {
                            num = xs + WE(k+3,n) + 2
                            n++
                        }
                    }
                }
            }
        }
        table += "</div></div></div>"
    }
	elements_table.setHTML(table)

    let elem_tier = new Element("elemTierDiv")
    table = ""

    for (let i = 1; i <= MAX_ELEM_TIERS; i++) {
        table += `
        <button class="btn" id="elemTier_btn${i}" onclick="player.atom.elemTier = ${i}">
            Tier ${i}<br>
            <span style="font-size: 10px">[${ELEMENTS.exp[i-1]+1} - ${ELEMENTS.exp[i]}]</span>
        </button>
        `
    }

    elem_tier.setHTML(table)
}
function updateElementsHTML() {
    let tElem = tmp.elements

	if (tElem.unl_length<=118)player.atom.elemTier=Math.min(player.atom.elemTier,1)
	if (tElem.unl_length<=218)player.atom.elemTier=Math.min(player.atom.elemTier,2)
	if (tElem.unl_length<=362)player.atom.elemTier=Math.min(player.atom.elemTier,3)
    tmp.el.elemTierDiv.setDisplay(hasUpgrade("atom",16) || player.superGal.gte(1))

    let ch = tElem.choosed
    tmp.el.elem_ch_div.setVisible(ch>0)
    if (ch) {
        let can_charge_neko = ch > 218? hasTree("qp43") : true
        tmp.el.elem_desc.setHTML(("<b>["+ELEMENTS.fullNames[ch]+"]</b>"+ELEMENTS.upgs[ch].desc+(hasChargedElement(ch)?"<b> [已充能]</b>":""))+((hasElement(380) && ELEMENTS.upgs[ch].ccost && can_charge_neko) ? "<span class=yellow><br>充能效果："+ELEMENTS.upgs[ch].cdesc+"</span>" : ""))
		if(ELEMENTS.upgs[ch].desc instanceof Function)tmp.el.elem_desc.setHTML("<b>["+ELEMENTS.fullNames[ch]+"]</b> "+ELEMENTS.upgs[ch].desc())
        tmp.el.elem_cost.setTxt(format(ELEMENTS.upgs[ch].cost,0)+"夸克"+(ch>86?"(需进入大撕裂)":"")+(player.qu.rip.active&&tmp.elements.cannot.includes(ch)?"[大撕裂中无法购买]":"") + ((hasElement(380) && ELEMENTS.upgs[ch].ccost) ? "，充能需要"+format(ELEMENTS.upgs[ch].ccost,0)+"夸克" : ""))
        if(ch > 118)tmp.el.elem_cost.setTxt((ELEMENTS.upgs[ch].galQk||ELEMENTS.upgs[ch].exotic||ELEMENTS.upgs[ch].qk||ELEMENTS.upgs[ch].ds?format:formatMass)(ELEMENTS.upgs[ch].cost,0)+(ELEMENTS.upgs[ch].qk?"夸克":ELEMENTS.upgs[ch].ds?" Dark Shadow":ELEMENTS.upgs[ch].exotic?"奇异物质":ELEMENTS.upgs[ch].galQk?"星系夸克":ELEMENTS.upgs[ch].et?"永恒质量":"无限质量") + ((hasElement(483) && ELEMENTS.upgs[ch].ccost) ? "，充能需要"+formatMass(ELEMENTS.upgs[ch].ccost,0)+(ELEMENTS.upgs[ch].et?"永恒质量":"无限质量") : ""))
		tmp.el.elem_eff.setHTML((ELEMENTS.upgs[ch].effDesc?"Currently: "+ELEMENTS.upgs[ch].effDesc(tElem.effect[ch]):"")+(hasElement(380) && ELEMENTS.upgs[ch].ceffDesc?"<span class=yellow><br>Current Charged Effect: "+ELEMENTS.upgs[ch].ceffDesc(tElem.ceffect[ch])+"</span>":""))
    }

    for (let x = 1; x <= MAX_ELEM_TIERS; x++) {
        let unl = player.atom.elemTier == x
        tmp.el["elemTier"+x+"_div"].setDisplay(unl)
        if (unl) {
            if (x == 1) {
                tmp.el.element_la_1.setVisible(tElem.unl_length>56)
                tmp.el.element_la_3.setVisible(tElem.unl_length>56)
                tmp.el.element_la_2.setVisible(tElem.unl_length>88)
                tmp.el.element_la_4.setVisible(tElem.unl_length>88)
            }

            for (let x = 1; x <= tElem.upg_length; x++) {
                let upg = tmp.el['elementID_'+x]
                if (upg) {
                    let unl2 = x <= tElem.unl_length
                    upg.setVisible(unl2)
                    if (unl2) {
                        upg.setClasses({elements: true, locked: !ELEMENTS.canBuy(x), bought: hasElement(x), br: (x > 86 && x <= 118), ext: (x > 118), et: ELEMENTS.upgs[x].et, gqk: ELEMENTS.upgs[x].galQk, ds: ELEMENTS.upgs[x].ds, ex: ELEMENTS.upgs[x].exotic, qk: ELEMENTS.upgs[x].qk, ch: hasChargedElement(x), cancharge: ELEMENTS.canCharge(x)})
                    }
                }
            }
        }
    }
}

function updateElementsTemp() {
	if (!player.atom.elemTier)player.atom.elemTier = 1
    let cannot = []
    if (player.qu.rip.active && !hasTree('br2')) cannot.push(58,74)
    tmp.elements.cannot = cannot

    if (!tmp.elements.upg_length) tmp.elements.upg_length = ELEMENTS.upgs.length-1
    for (let x = tmp.elements.upg_length; x >= 1; x--) if (ELEMENTS.upgs[x].effect) {
        tmp.elements.effect[x] = ELEMENTS.upgs[x].effect()
    }
    for (let x = tmp.elements.upg_length; x >= 1; x--) if (ELEMENTS.upgs[x].ceffect) {
        tmp.elements.ceffect[x] = ELEMENTS.upgs[x].ceffect()
    }
    tmp.elements.unl_length = ELEMENTS.getUnlLength()
}
