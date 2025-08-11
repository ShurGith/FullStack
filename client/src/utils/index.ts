export function formatPrice(amount: number) {
	return new Intl.NumberFormat('es-ES', {
		style: 'currency',
		currency: 'EUR'
	}).format(amount);
}