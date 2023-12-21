export function generateSlug(name: string) {
  const sanitizedName = name.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  return sanitizedName.replace(/\s+/g, '_').toLowerCase();
}
