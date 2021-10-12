import './sintaxis'
declare global {
	interface Country{
		id: number
		name: string
		alpha2: string
		alpha3: string
  }
	let Country: Entity<Country>
}
