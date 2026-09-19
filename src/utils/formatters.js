import placeholderImage from '../assets/console-placeholder.svg';

export function formatPrice(value) {
  return new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'USD' }).format(Number(value));
}

export function resolveImage(imageUrl) {
  const source = typeof imageUrl === 'string' ? imageUrl.trim() : '';
  return source && /^https?:\/\//i.test(source) ? source : placeholderImage;
}
