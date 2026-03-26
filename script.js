const App = (() => {
    const dictionary = {
        ar: { balanceLabel: "رصيد كارت المترو", plannerTitle: "تخطيط الرحلة", btnBook: "تأكيد وحجز المفتاح الرقمي", fareLabel: "تكلفة الرحلة", historyTitle: "سجل العمليات الأخيرة", logout: "خروج", loginTitle: "تعريف الهوية", btnLogin: "دخول النظام", modalTitle: "مفتاح الوصول الرقمي", lblFrom: "التحرك", lblTo: "الوصول", lblPassenger: "الراكب", alertLow: "رصيدك غير كافٍ!", alertSame: "اختر محطة وصول مختلفة!", noHistory: "لا توجد رحلات سابقة." },
        fr: { balanceLabel: "Solde de la Carte", plannerTitle: "Planificateur de Trajet", btnBook: "Réserver la Clé", fareLabel: "Tarif du Trajet", historyTitle: "Activité Récente", logout: "Déconnexion", loginTitle: "Identification", btnLogin: "Accès", modalTitle: "Clé d'Accès Digitale", lblFrom: "Départ", lblTo: "Arrivée", lblPassenger: "Passager", alertLow: "Solde Insuffisant!", alertSame: "Même station sélectionnée!", noHistory: "Aucune activité récente." }
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
        toast.className = `px-8 py-4 rounded-2xl shadow-2xl border text-[10px] font-black uppercase animate-modal pointer-events-auto ${type === 'error' ? 'bg-red-600 text-white border-red-400' : 'bg-slate-800 text-white border-white/10'}`;
        toast.innerText = msg;
        wrapper.appendChild(toast);
        setTimeout(() => toast.remove(), 4000);
    };

    return {
        init: () => {
            state.lang = localStorage.getItem('metroLang');
            setTimeout(() => {
                const splash = document.getElementById('splash-screen');
                splash.style.opacity = '0';
                setTimeout(() => {
                    splash.remove();
                    if (!state.lang) {
                        document.getElementById('lang-selection').classList.replace('hidden', 'flex');
                    } else {
                        App.startApp();
                    }
                }, 1000);
            }, 3500);
            lucide.createIcons();
        },

        setInitialLang: (l) => {
            state.lang = l;
            localStorage.setItem('metroLang', l);
            document.getElementById('lang-selection').style.opacity = '0';
            setTimeout(() => {
                document.getElementById('lang-selection').remove();
                App.startApp();
            }, 700);
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
            
            state.stations.forEach(st => {
                const icon = L.divIcon({ className: 'custom-marker', html: `<div class="w-3 h-3 bg-sky-600 border border-white rounded-full custom-marker-node relative"></div>` });
                const marker = L.marker([st.lat, st.lng], { icon }).addTo(state.map);
                marker.bindTooltip(st.name[state.lang], { permanent: true, direction: 'top', className: 'station-label', offset: [0, -5] });
                
                // تصحيح رابط جوجل ماب
                marker.on('click', () => window.open(`https://www.google.com/maps?q=${st.lat},${st.lng}`, '_blank'));
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
            const mapping = { 'lang-balance-label': d.balanceLabel, 'lang-planner-title': d.plannerTitle, 'lang-btn-book': d.btnBook, 'lang-fare-label': d.fareLabel, 'lang-history-title': d.historyTitle, 'lang-btn-login': d.btnLogin, 'lang-logout': d.logout, 'modal-title': d.modalTitle, 'lbl-from': d.lblFrom, 'lbl-to': d.lblTo, 'lbl-passenger': d.lblPassenger };
            for (let id in mapping) if (document.getElementById(id)) document.getElementById(id).innerText = mapping[id];
            
            const options = state.stations.map(s => `<option value="${s.id}">${s.name[state.lang]}</option>`).join('');
            document.getElementById('origin').innerHTML = options;
            document.getElementById('destination').innerHTML = options;
            App.renderHistory();
            lucide.createIcons();
        },

        renderHistory: () => {
            const container = document.getElementById('history-list');
            if (state.history.length === 0) { 
                container.innerHTML = `<div class="col-span-full py-8 text-center text-slate-700 text-[10px] font-black uppercase tracking-widest animate-fade-in">${dictionary[state.lang].noHistory}</div>`; 
                return; 
            }
            container.innerHTML = state.history.slice(0, 4).map((trip, index) => `
                <div class="bg-white/[0.03] border border-white/5 p-6 rounded-[2.5rem] flex justify-between items-center group hover:bg-white/5 transition-all hover:scale-[1.02] animate-fade-in" style="animation-delay: ${index * 100}ms">
                    <div><p class="text-[11px] font-black text-white">${trip.from} ➜ ${trip.to}</p><p class="text-[8px] font-bold text-slate-500 uppercase mt-1 tracking-widest">${trip.time}</p></div>
                    <p class="text-xs font-black text-sky-400 group-hover:text-white transition-colors">-${trip.price} EGP</p>
                </div>`).join('');
        },

        updateFare: () => {
            const s = parseInt(document.getElementById('origin').value);
            const e = parseInt(document.getElementById('destination').value);
            const count = Math.abs(e - s);
            
            // تحديث عدد المحطات في الواجهة
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
                const trip = { from, to, price, time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) };
                state.history.unshift(trip);
                localStorage.setItem('metroHistory', JSON.stringify(state.history));
                
                App.showTicket(trip);
                App.renderHistory();
            } else {
                notify(dictionary[state.lang].alertLow, "error");
            }
        },

        showTicket: (trip) => {
            const qrBox = document.getElementById('qrcode');
            qrBox.innerHTML = "";
            document.getElementById('qr-modal').classList.replace('hidden', 'flex');
            document.getElementById('ticket-user-name').innerText = state.currentUser.name;
            document.getElementById('ticket-from').innerText = trip.from;
            document.getElementById('ticket-to').innerText = trip.to;

            new QRCode(qrBox, {
                text: `KEY:${state.currentUser.name}|TRIP:${trip.from}-${trip.to}|ID:${Date.now()}`,
                width: 130, height: 130, colorDark: "#000000", colorLight: "#ffffff"
            });
        },

        closeTicket: () => document.getElementById('qr-modal').classList.replace('flex', 'hidden'),

        login: () => {
            const n = document.getElementById('user-name-input').value;
            if (n.trim().length >= 3) {
                localStorage.setItem('metroUser', JSON.stringify({ name: n, balance: 150.00 }));
                location.reload();
            }
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
                notify(state.lang === 'ar' ? "تم شحن الرصيد بنجاح" : "Top-up Successful");
            }
        }
    };
})();

window.onload = App.init;