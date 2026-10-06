import { items } from '../data/items'
import ItemCard from '../components/ItemCard'

export default function Home() {
  return (
    <main className="container">
      <h1>Because you searched...</h1>
      <div className="item-grid">
        {items.map((item) => (
          <ItemCard key={item.id} item={item} />
        ))}
      </div>
    </main>
  )
}