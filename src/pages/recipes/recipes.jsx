import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import './recipes.css';

const FEATURED_RECIPE = {
  itemID: 101,
  itemName: "Creamy Garlic Chicken Pasta",
  itemDescription: "A rich, comforting weeknight dinner that comes together in under an hour. Perfect for cozy evenings.",
  itemPrice: 340,
  restaurantName: "Cucina Bella",
  imageUrl: "/creamy-chicken-pasta.jpg"
};

const FALLBACK_RECIPES = [
  FEATURED_RECIPE,
  {
    itemID: 76,
    itemName: "Afghan Kebabs",
    itemDescription: "Grilled kebabs made with marinated lamb, served with warm naan and spices.",
    itemPrice: 450,
    restaurantName: "Peacock Rooftop",
    imageUrl: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=500&auto=format&fit=crop&q=60"
  },
  {
    itemID: 11,
    itemName: "Bagara Baingan",
    itemDescription: "Fried brinjal cooked in a rich, flavorful curry with coconut and sesame.",
    itemPrice: 250,
    restaurantName: "Mumtaz Restaurant",
    imageUrl: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&auto=format&fit=crop&q=60"
  },
  {
    itemID: 12,
    itemName: "Butter Chicken",
    itemDescription: "Tender chicken pieces simmered in a creamy, velvety spiced tomato gravy.",
    itemPrice: 380,
    restaurantName: "Royal Spice",
    imageUrl: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=500&auto=format&fit=crop&q=60"
  },
  {
    itemID: 14,
    itemName: "Paneer Tikka",
    itemDescription: "Cottage cheese cubes marinated in spiced yogurt and grilled to smoky perfection.",
    itemPrice: 290,
    restaurantName: "Haveli Treats",
    imageUrl: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=500&auto=format&fit=crop&q=60"
  },
  {
    itemID: 15,
    itemName: "Classic Margherita Pizza",
    itemDescription: "Fresh basil, ripe San Marzano tomatoes, and creamy mozzarella on sourdough crust.",
    itemPrice: 320,
    restaurantName: "Bella Italia",
    imageUrl: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=500&auto=format&fit=crop&q=60"
  },
  {
    itemID: 16,
    itemName: "Berry Açai Bowl",
    itemDescription: "Organic açai smoothie bowl topped with fresh berries, chia seeds, and granola.",
    itemPrice: 210,
    restaurantName: "Green Life Cafe",
    imageUrl: "https://images.unsplash.com/photo-1590301157890-4810ed352733?w=500&auto=format&fit=crop&q=60"
  }
];

export function Recipes(){
  const navigate = useNavigate();
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function loadRecipes() {
      try {
        // Try local Vite proxy first (completely eliminates CORS in dev)
        let response = await fetch('/api/Restaurant/items');
        
        if (!response.ok) {
          // Fallback direct request
          response = await fetch('https://fakerestaurantapi.runasp.net/api/Restaurant/items');
        }

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        const parsed = Array.isArray(data) 
          ? data 
          : (typeof data.contents === 'string' ? JSON.parse(data.contents) : (data.contents || []));

        if (isMounted) {
          const combined = [
            FEATURED_RECIPE,
            ...(parsed || []).filter((it) => it.itemID !== 101)
          ];
          setRecipes(combined);
          setLoading(false);
        }
      } catch (err) {
        console.warn("Using fallback recipe list due to API fetch issue:", err);
        if (isMounted) {
          setRecipes(FALLBACK_RECIPES);
          setLoading(false);
        }
      }
    }

    loadRecipes();

    return () => {
      isMounted = false;
    };
  }, []);

    
return(
<div>

<div className="recipe-page">
      {/* 1. Hero Section at the top */}
      {/* <Hero /> */}

      {/* 2. Featured Recipes Section below */}
      <section className="recipes-section">
        <div className="section-header">
          <div>
            <h2 className="section-title">Explore Recipes</h2>
            <p className="section-subtitle">Hand-picked seasonal favorites just for you.</p>
          </div>
          <a href="#all" className="view-all">View All &rsaquo;</a>
        </div>

        {loading ? (
          <div className="loading-state">Loading recipes...</div>
        ) : (
          <div className="recipe-grid">
            {recipes.map((item, index) => (
              <div 
                key={item.itemID || index} 
                className="recipe-card"
                onClick={() => navigate(`/recipes/${item.itemID}`)}
                role="button"
                tabIndex={0}



                
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    navigate(`/recipes/${item.itemID}`);
                  }
                }}
              >
                
                {/* Recipe Image with Price Tag Badge */}
                <div 
                  className="recipe-image-placeholder" 
                  style={{ backgroundImage: `url(${item.imageUrl || '/creamy-chicken-pasta.jpg'})` }}
                >
                  <span className="recipe-badge">&#36;{item.itemPrice}</span>
                </div>

                {/* Recipe Card Body */}
                <div className="recipe-card-body">
                  <span className="recipe-category">{item.restaurantName}</span>
                  <h3 className="recipe-name">{item.itemName}</h3>
                  <p className="recipe-desc">{item.itemDescription}</p>
                  
                  <div className="recipe-footer">
                    <span className="recipe-rating">&#9733; 4.9 (120)</span>
                    <span className="recipe-heart">&#9825;</span>
                  </div>
                </div>

              </div>
            ))}
          </div>
        )}
      </section>
    </div>   


</div>




);

}