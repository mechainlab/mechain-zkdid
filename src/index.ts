const world1 = 'world';

console.log("hello TypeScript")

export function hello(world: string = world1): string {
    console.log("sdfghsd");
  return `Hello ${world}! `;
}