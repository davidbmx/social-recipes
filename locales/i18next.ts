import i18next from 'i18next';
import esNs1 from './es/ns1.json';
import enNs1 from './en/ns1.json';

i18next.init({
	lng: 'en',
	debug: true,
	defaultNS: 'ns1',
	pluralSeparator: undefined,
	compatibilityJSON: 'v3',
	resources: {
		en: {
			ns1: enNs1,
		},
		es: {
			ns1: esNs1,
		},
	},
});

export default i18next;
