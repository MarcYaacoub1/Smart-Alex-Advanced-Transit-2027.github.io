const App = (() => {
    const dictionary = {
        ar: {
            balanceLabel: "رصيد كارت المترو",
            plannerTitle: "تخطيط الرحلة",
            btnBook: "حجز المفتاح الرقمي",
            fareLabel: "تكلفة الرحلة",
            historyTitle: "سجل الرحلات",
            logout: "خروج",
            btnLogin: "دخول النظام",
            modalTitle: "مفتاح الوصول الرقمي",
            lblFrom: "التحرك",
            lblTo: "الوصول",
            lblPassenger: "الراكب",
            stationsLabel: "محطات",
            pricingTitle: "نظام التسعيرة الذكي",
            aboutTitle: "عن مشروع مترو الإسكندرية",
            aboutDesc: "مشروع مترو الإسكندرية 2027 هو تحول جذري لخط قطار أبو قير الحالي إلى مترو أنفاق كهربائي متطور، يهدف لربط أقصى شرق المدينة بوسطها بسرعة وكفاءة عالية.",
            specsTitle: "المواصفات الفنية",
            specs: ["طول الخط: 21.7 كم", "عدد المحطات: 20 محطة", "السرعة: 80 كم/ساعة", "الطاقة: كهربائي بالكامل"],
            pricing: ["حتى 9 محطات: 8 ج.م", "من 10 لـ 16 محطة: 10 ج.م", "أكثر من 16 محطة: 15 ج.م"],
            alertLow: "رصيدك غير كافٍ!",
            alertSame: "اختر محطة وصول مختلفة!",
            noHistory: "لا توجد رحلات سابقة.",
            // Eco Impact
            ecoTitle: "الأثر البيئي المستدام",
            ecoSubtitle: "البنية التحتية الخضراء للإسكندرية",
            ecoCO2: "كجم كربون تم توفيره",
            ecoTime: "توفير في الوقت",
            ecoEnergy: "طاقة نظيفة"
        },
        fr: {
            balanceLabel: "Solde de la Carte",
            plannerTitle: "Planificateur de Trajet",
            btnBook: "Réserver la Clé",
            fareLabel: "Tarif du Trajet",
            historyTitle: "Activité Récente",
            logout: "Déconnexion",
            btnLogin: "Accès",
            modalTitle: "Clé d'Accès Digitale",
            lblFrom: "Départ",
            lblTo: "Arrivée",
            lblPassenger: "Passager",
            stationsLabel: "Stations",
            pricingTitle: "Système de Tarification",
            aboutTitle: "À Propos du Projet",
            aboutDesc: "Le Métro d'Alexandrie 2027 est une transformation majeure de la ligne Abou Qir en un métro électrique moderne reliant l'est au centre-ville.",
            specsTitle: "Spécifications",
            specs: ["Longueur: 21.7 km", "Stations: 20", "Vitesse: 80 km/h", "Énergie: 100% Électrique"],
            pricing: ["Jusqu'à 9 stations: 8 EGP", "10 à 16 stations: 10 EGP", "Plus de 16 stations: 15 EGP"],
            alertLow: "Solde Insuffisant!",
            alertSame: "Même station sélectionnée!",
            noHistory: "Aucune activité.",
            // Eco Impact
            ecoTitle: "Impact Éco-Durable",
            ecoSubtitle: "Infrastructure Verte d'Alexandrie",
            ecoCO2: "kg CO2 Économisés",
            ecoTime: "Gain de Temps",
            ecoEnergy: "Énergie Propre"
        }
    };

    const state = {
        balance: 0.00, lang: null, currentUser: null, history: [],
        stations: [
            { id: 1, name: { ar: "أبو قير", fr: "Abou Qir" }, lat: 31.3200, lng: 30.0630 },
            { id: 2, name: { ar: "طوسون", fr: "Tosson" }, lat: 31.3115, lng: 30.0520 },
            { id: 3, name: { ar: "المعمورة", fr: "Maamoura" }, lat: 31.2895, lng: 30.0265 },
            { id: 4, name: { ar: "الإصلاح", fr: "El Islah" }, lat: 31.2820, lng: 30.0150 },
            { id: 5, name: { ar: "المنتزة", fr: "El Montaza" }, lat: 31.2785, lng: 30.0085 },
            { id: 6, name: { ar: "المندرة", fr: "El Mandara" }, lat: 31.2720, lng: 29.9990 },
            { id: 7, name: { ar: "العصافرة", fr: "El Asafra" }, lat: 31.2650, lng: 29.9880 },
            { id: 8, name: { ar: "ميامي", fr: "Miami" }, lat: 31.2590, lng: 29.9800 },
            { id: 9, name: { ar: "سيدي بشر", fr: "Sidi Bishr" }, lat: 31.2530, lng: 29.9720 },
            { id: 10, name: { ar: "فيكتوريا", fr: "Victoria" }, lat: 31.2460, lng: 29.9650 },
            { id: 11, name: { ar: "غبريال", fr: "Ghabrial" }, lat: 31.2380, lng: 29.9580 },
            { id: 12, name: { ar: "الظاهرية", fr: "El Zahiria" }, lat: 31.2290, lng: 29.9480 },
            { id: 13, name: { ar: "سيدي جابر", fr: "Sidi Gaber" }, lat: 31.2195, lng: 29.9385 },
            { id: 14, name: { ar: "سبورتنج", fr: "Sporting" }, lat: 31.2120, lng: 29.9280 },
            { id: 15, name: { ar: "الإبراهيمية", fr: "El Ibrahimia" }, lat: 31.2060, lng: 29.9200 },
            { id: 16, name: { ar: "الحضرة", fr: "El Hadara" }, lat: 31.1990, lng: 29.9150 },
            { id: 17, name: { ar: "باب شرق", fr: "Bab Shark" }, lat: 31.1950, lng: 29.9100 },
            { id: 18, name: { ar: "محطة مصر", fr: "Gare Misr" }, lat: 31.1925, lng: 29.9065 }
        ]
    };

    const notify = (msg, type = 'info') => {
        const wrapper = document.getElementById('toast-wrapper');
        const toast = document.createElement('div');
        toast.className = `px-8 py-4 rounded-2xl shadow-2xl border text-[10px] font-black uppercase animate-modal pointer-events-auto ${type === 'error' ? 'bg-red-600' : 'bg-slate-800'} text-white border-white/10`;
        toast.innerText = msg;
        wrapper.appendChild(toast);
        setTimeout(() => toast.remove(), 4000);
    };

    const updateClock = () => {
        const now = new Date();
        const timeStr = now.toLocaleTimeString(state.lang === 'ar' ? 'ar-EG' : 'en-US', { 
            hour: '2-digit', 
            minute: '2-digit', 
            second: '2-digit', 
            hour12: true 
        });
        if(document.getElementById('digital-clock')) document.getElementById('digital-clock').innerText = timeStr;
    };

    return {
        init: () => {
            state.lang = localStorage.getItem('metroLang');
            setInterval(updateClock, 1000);
            setTimeout(() => {
                document.getElementById('splash-screen').style.opacity = '0';
                setTimeout(() => {
                    document.getElementById('splash-screen').remove();
                    if (!state.lang) document.getElementById('lang-selection').classList.replace('hidden', 'flex');
                    else App.startApp();
                }, 1000);
            }, 3500);
            lucide.createIcons();
        },

        setInitialLang: (l) => {
            state.lang = l;
            localStorage.setItem('metroLang', l);
            document.getElementById('lang-selection').remove();
            App.startApp();
        },

        startApp: () => {
            const user = localStorage.getItem('metroUser');
            if (user) {
                state.currentUser = JSON.parse(user);
                state.balance = state.currentUser.balance;
                document.getElementById('login-form').classList.add('hidden');
                document.getElementById('user-profile').classList.remove('hidden');
                document.getElementById('display-name').innerText = state.currentUser.name;
                document.getElementById('user-avatar').innerText = state.currentUser.name[0].toUpperCase();
            }
            state.history = JSON.parse(localStorage.getItem('metroHistory')) || [];
            
            state.map = L.map('map-ui', { zoomControl: false, attributionControl: false }).setView([31.25, 29.98], 12);
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(state.map);
            
            const routeCoords = state.stations.map(st => [st.lat, st.lng]);
            L.polyline(routeCoords, { color: '#0ea5e9', weight: 3, opacity: 0.6, className: 'route-line' }).addTo(state.map);

            state.stations.forEach(st => {
                const icon = L.divIcon({ className: 'custom-marker', html: `<div class=\"w-3 h-3 bg-sky-600 border border-white rounded-full\"></div>` });
                L.marker([st.lat, st.lng], { icon }).addTo(state.map)
                 .bindTooltip(st.name[state.lang], { permanent: true, direction: 'top', className: 'station-label', offset: [0, -5] });
            });

            document.getElementById('app-root').style.opacity = '1';
            document.getElementById('balance-display').innerText = state.balance.toFixed(2);
            App.translate();
            App.updateFare();
        },

        translate: () => {
            const d = dictionary[state.lang];
            document.documentElement.dir = state.lang === 'ar' ? 'rtl' : 'ltr';
            document.getElementById('btn-lang-toggle').innerText = state.lang === 'ar' ? 'FRANÇAIS' : 'بالعربية';
            
            const mapping = { 
                'lang-balance-label': d.balanceLabel, 'lang-planner-title': d.plannerTitle, 
                'lang-btn-book': d.btnBook, 'lang-fare-label': d.fareLabel, 
                'lang-history-title': d.historyTitle, 'lang-btn-login': d.btnLogin, 
                'lang-logout': d.logout, 'modal-title': d.modalTitle, 
                'lbl-from': d.lblFrom, 'lbl-to': d.lblTo, 'lbl-passenger': d.lblPassenger,
                'lang-stations-label': d.stationsLabel, 'lang-pricing-title': d.pricingTitle,
                'lang-about-title': d.aboutTitle, 'lang-about-desc': d.aboutDesc,
                'lang-specs-title': d.specsTitle,
                // New Eco Mappings
                'lang-eco-title': d.ecoTitle, 'lang-eco-subtitle': d.ecoSubtitle,
                'lang-eco-co2': d.ecoCO2, 'lang-eco-time': d.ecoTime, 'lang-eco-energy': d.ecoEnergy
            };
            for (let id in mapping) if (document.getElementById(id)) document.getElementById(id).innerText = mapping[id];
            
            const options = state.stations.map(s => `<option value="${s.id}">${s.name[state.lang]}</option>`).join('');
            document.getElementById('origin').innerHTML = options;
            document.getElementById('destination').innerHTML = options;

            document.getElementById('pricing-list').innerHTML = d.pricing.map(p => `<div class=\"pricing-item text-[10px] text-slate-300\"><span>${p.split(':')[0]}</span><span class=\"font-black text-sky-400\">${p.split(':')[1]}</span></div>`).join('');
            document.getElementById('lang-specs-list').innerHTML = d.specs.map(s => `<li>${s}</li>`).join('');

            App.renderHistory();
            lucide.createIcons();
        },

        updateFare: () => {
            const s = parseInt(document.getElementById('origin').value);
            const e = parseInt(document.getElementById('destination').value);
            const count = Math.abs(e - s);
            document.getElementById('station-count').innerText = count;
            let price = count === 0 ? 0 : (count <= 9 ? 8 : (count <= 16 ? 10 : 15));
            document.getElementById('fare-output').innerText = price;
        },

        processBooking: () => {
            if (!state.currentUser) return notify(state.lang === 'ar' ? "برجاء الدخول أولاً" : "Please Login First", "error");
            const price = parseInt(document.getElementById('fare-output').innerText);
            if (price === 0) return notify(dictionary[state.lang].alertSame, "error");
            
            if (state.balance >= price) {
                state.balance -= price;
                state.currentUser.balance = state.balance;
                localStorage.setItem('metroUser', JSON.stringify(state.currentUser));
                document.getElementById('balance-display').innerText = state.balance.toFixed(2);
                
                const from = document.getElementById('origin').options[document.getElementById('origin').selectedIndex].text;
                const to = document.getElementById('destination').options[document.getElementById('destination').selectedIndex].text;
                const trip = { from, to, price, time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit', hour12: true}) };
                state.history.unshift(trip);
                localStorage.setItem('metroHistory', JSON.stringify(state.history));
                
                App.showTicket(trip);
                App.renderHistory();
            } else notify(dictionary[state.lang].alertLow, "error");
        },

        showTicket: (trip) => {
            const qrBox = document.getElementById('qrcode');
            qrBox.innerHTML = "";
            document.getElementById('qr-modal').classList.replace('hidden', 'flex');
            document.getElementById('ticket-user-name').innerText = state.currentUser.name;
            document.getElementById('ticket-from').innerText = trip.from;
            document.getElementById('ticket-to').innerText = trip.to;
            new QRCode(qrBox, { text: `TICKET:${Date.now()}`, width: 220, height: 220 });
        },

        closeTicket: () => document.getElementById('qr-modal').classList.replace('flex', 'hidden'),
        login: () => {
            const n = document.getElementById('user-name-input').value;
            if (n.trim().length >= 3) { localStorage.setItem('metroUser', JSON.stringify({ name: n, balance: 150.00 })); location.reload(); }
        },
        logout: () => { localStorage.clear(); location.reload(); },
        toggleLanguage: () => {
            state.lang = state.lang === 'ar' ? 'fr' : 'ar';
            localStorage.setItem('metroLang', state.lang);
            App.translate();
            App.updateFare();
        },
        handleTopUp: () => {
            const amt = parseFloat(document.getElementById('topup-amount').value);
            if (amt > 0 && state.currentUser) {
                state.balance += amt;
                state.currentUser.balance = state.balance;
                localStorage.setItem('metroUser', JSON.stringify(state.currentUser));
                document.getElementById('balance-display').innerText = state.balance.toFixed(2);
                document.getElementById('topup-amount').value = '';
                notify(state.lang === 'ar' ? "تم الشحن بنجاح" : "Top-up Successful");
            }
        },
        renderHistory: () => {
            const container = document.getElementById('history-list');
            if (state.history.length === 0) { 
                container.innerHTML = `<div class=\"col-span-full py-8 text-center text-slate-700 text-[10px] uppercase font-black tracking-widest\">${dictionary[state.lang].noHistory}</div>`; 
                return; 
            }
            container.innerHTML = state.history.slice(0, 4).map(trip => `
                <div class=\"bg-white/[0.03] border border-white/5 p-6 rounded-[2.5rem] flex justify-between items-center group transition-all hover:bg-white/5\">
                    <div><p class=\"text-[11px] font-black text-white\">${trip.from} ➜ ${trip.to}</p><p class=\"text-[8px] font-bold text-slate-500 uppercase mt-1 tracking-widest\">${trip.time}</p></div>
                    <p class=\"text-xs font-black text-sky-400\">-${trip.price} EGP</p>
                </div>`).join('');
        }
    };
})();

window.onload = App.init;