import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import './recipeDetails.css';
import { FiClock, FiUsers, FiZap, FiHeart } from 'react-icons/fi';
import { FaHeart } from 'react-icons/fa6';

// The featured recipe matching the user's screenshot
const FEATURED_RECIPE = {
  itemID: 101,
  itemName: 'Creamy Garlic Chicken Pasta',
  category: 'Pasta',
  itemDescription:
    'A rich, comforting weeknight dinner that comes together in under an hour. Perfect for cozy evenings.',
  imageUrl: '/creamy-chicken-pasta.jpg',
  totalTime: '45 min',
  yields: '4 Servings',
  difficulty: 'Easy',
  tags: ['Dinner', 'Italian', 'Comfort Food'],
  instructions: [
    {
      step: 1,
      title: 'Cook pasta',
      desc: 'Bring a large pot of salted water to a boil. Add the pasta and cook according to package directions until al dente. Reserve 1 cup of pasta water before draining.',
    },
    {
      step: 2,
      title: 'Prepare chicken',
      desc: 'While pasta cooks, season chicken breasts with salt, pepper, and Italian seasoning. In a large skillet over medium-high heat, melt butter and olive oil. Cook chicken for 6-7 minutes per side until golden and cooked through. Remove and slice.',
    },
    {
      step: 3,
      title: 'Add garlic and cream',
      desc: 'In the same skillet, reduce heat to medium. Add minced garlic and sauté for 1 minute until fragrant. Pour in heavy cream and chicken broth, scraping up any browned bits from the bottom of the pan. Simmer for 3-4 minutes until slightly thickened.',
    },
    {
      step: 4,
      title: 'Mix',
      desc: 'Add the drained pasta and sliced chicken back into the skillet. Toss gently to coat everything evenly in the creamy sauce. If the sauce is too thick, add reserved pasta water a splash at a time.',
    },
  ],
  ingredients: [
    '8 oz fettuccine or penne pasta',
    '2 boneless, skinless chicken breasts, sliced',
    '4 cloves fresh garlic, minced',
    '1 cup heavy whipping cream',
    '1/2 cup low-sodium chicken broth',
    '1 cup fresh baby spinach',
    '1/3 cup sun-dried tomatoes, thinly sliced',
    '1/2 cup freshly grated Parmesan cheese',
    '2 tbsp olive oil & 1 tbsp butter',
    '1 tsp Italian seasoning, sea salt and black pepper',
  ],
  overview:
    'This Creamy Garlic Chicken Pasta is a restaurant-quality meal you can effortlessly prepare at home in under 45 minutes. The velvety sauce is enriched with freshly grated parmesan, aromatic garlic, and sun-dried tomatoes that complement the tender, golden-seared chicken breast slices.',
  nutrition: {
    calories: '560 kcal',
    protein: '38g',
    carbs: '48g',
    fat: '24g',
  },
  reviews: [
    {
      name: 'Elena Rostova',
      date: '2 days ago',
      rating: 5,
      comment:
        'Absolutely delicious! My whole family loved this dish. The sauce is velvety without being overly heavy. Will definitely make it again!',
    },
    {
      name: 'Marcus Thorne',
      date: '1 week ago',
      rating: 5,
      comment:
        'Super easy to follow instructions. Adding the reserved starchy pasta water made the sauce adhere to the fettuccine like magic.',
    },
    {
      name: 'Sarah Jenkins',
      date: '2 weeks ago',
      rating: 5,
      comment:
        'Made this for date night and it was a huge hit. Restaurant quality with simple pantry ingredients!',
    },
  ],
};

export function RecipeDetails() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('instructions');
  const [isFavorite, setIsFavorite] = useState(false);
  const [checkedIngredients, setCheckedIngredients] = useState({});

  useEffect(() => {
    let isMounted = true;

    async function fetchRecipeDetails() {
      // If user opened item 101 or no id provided, use the screenshot's exact recipe
      if (id === '101' || !id) {
        if (isMounted) {
          setRecipe(FEATURED_RECIPE);
          setLoading(false);
        }
        return;
      }

      try {
        // Fetch recipes from the API via Vite proxy
        let res = await fetch('/api/Restaurant/items');
        if (!res.ok) {
          res = await fetch('https://fakerestaurantapi.runasp.net/api/Restaurant/items');
        }

        if (res.ok) {
          const items = await res.json();
          const target = items.find((it) => String(it.itemID) === String(id));

          if (target && isMounted) {
            // Build tailored rich details for the item from API
            const cuisine = target.restaurantName?.includes('Biryani')
              ? 'Indian'
              : target.itemName?.toLowerCase().includes('pasta') || target.itemName?.toLowerCase().includes('pizza')
              ? 'Italian'
              : 'Gourmet';

            const generatedRecipe = {
              itemID: target.itemID,
              itemName: target.itemName,
              category: cuisine,
              itemDescription:
                target.itemDescription ||
                `Freshly prepared ${target.itemName} crafted with premium culinary ingredients and authentic seasonings.`,
              imageUrl: target.imageUrl || '/creamy-chicken-pasta.jpg',
              totalTime: '35 min',
              yields: '2-4 Servings',
              difficulty: 'Easy',
              tags: [cuisine, target.restaurantName || 'Chef Special', 'Popular'],
              instructions: [
                {
                  step: 1,
                  title: 'Prepare ingredients',
                  desc: `Wash, measure, and prepare all fresh ingredients and aromatics for ${target.itemName}. Season protein or key vegetables with salt and ground pepper.`,
                },
                {
                  step: 2,
                  title: 'Sear and develop flavors',
                  desc: 'Heat cooking oil or butter in a skillet over medium heat. Sauté base aromatics until fragrant, then add the main ingredients to sear gently and lock in moisture.',
                },
                {
                  step: 3,
                  title: 'Simmer with sauce and spices',
                  desc: 'Incorporate complementary broth, cream, or traditional spices. Bring to a gentle simmer for 10-15 minutes until the sauce reduces to a rich consistency.',
                },
                {
                  step: 4,
                  title: 'Garnish and serve',
                  desc: `Plate the ${target.itemName} warm on a serving dish. Garnish with fresh herbs, cracked black pepper, and serve immediately with chosen sides.`,
                },
              ],
              ingredients: [
                `Fresh ingredients for ${target.itemName}`,
                '2 tbsp extra virgin olive oil or ghee',
                '3 cloves fresh garlic, finely minced',
                '1 medium onion or shallot, diced',
                'Fresh herbs (parsley, cilantro, or oregano)',
                'Sea salt and freshly cracked black pepper to taste',
              ],
              overview: `Specialty dish from ${target.restaurantName || 'our kitchen'}. Specially prepared using authentic recipes and high-quality seasonal ingredients for maximum flavor.`,
              nutrition: {
                calories: '480 kcal',
                protein: '28g',
                carbs: '42g',
                fat: '18g',
              },
              reviews: [
                {
                  name: 'David K.',
                  date: '3 days ago',
                  rating: 5,
                  comment: `One of the best versions of ${target.itemName} I have ever had! Will order and cook again.`,
                },
                {
                  name: 'Priya S.',
                  date: '1 week ago',
                  rating: 5,
                  comment: 'Amazing blend of spices and tender texture. 5 stars!',
                },
              ],
            };

            setRecipe(generatedRecipe);
            setLoading(false);
            return;
          }
        }
      } catch (err) {
        console.warn('Could not fetch from API, falling back to featured recipe:', err);
      }

      if (isMounted) {
        setRecipe(FEATURED_RECIPE);
        setLoading(false);
      }
    }

    fetchRecipeDetails();

    return () => {
      isMounted = false;
    };
  }, [id]);

  const toggleIngredient = (idx) => {
    setCheckedIngredients((prev) => ({
      ...prev,
      [idx]: !prev[idx],
    }));
  };

  if (loading) {
    return (
      <div className="recipe-details-page">
        <div className="recipe-details-container recipe-loading">
          <h2>Loading recipe details...</h2>
        </div>
      </div>
    );
  }

  if (!recipe) {
    return (
      <div className="recipe-details-page">
        <div className="recipe-details-container recipe-not-found">
          <h2>Recipe Not Found</h2>
          <p>We couldn't find the recipe you're looking for.</p>
          <Link to="/recipes" className="btn-back-home">
            Back to Recipes
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="recipe-details-page">
      <div className="recipe-details-container">
        {/* Breadcrumbs Navigation */}
        <nav className="recipe-breadcrumbs" aria-label="Breadcrumb">
          <Link to="/recipes" className="breadcrumb-link">
            Recipes
          </Link>
          <span className="breadcrumb-separator">&#8250;</span>
          <span className="breadcrumb-link">{recipe.category || 'Special'}</span>
          <span className="breadcrumb-separator">&#8250;</span>
          <span className="breadcrumb-current">{recipe.itemName}</span>
        </nav>

        {/* Main Two-Column Layout */}
        <div className="recipe-main-grid">
          {/* Left Column: Hero Image & Stat Cards */}
          <div className="recipe-media-column">
            <div className="recipe-hero-image-box">
              <img
                src={recipe.imageUrl}
                alt={recipe.itemName}
                className="recipe-hero-img"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = '/creamy-chicken-pasta.jpg';
                }}
              />
              <button
                type="button"
                className={`btn-fav-float ${isFavorite ? 'active' : ''}`}
                onClick={() => setIsFavorite(!isFavorite)}
                aria-label="Save to favorites"
                title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
              >
                {isFavorite ? <FaHeart color="#c93b2b" /> : <FiHeart />}
              </button>
            </div>

            {/* 3 Quick Stats Row */}
            <div className="recipe-stats-row">
              <div className="stat-box">
                <span className="stat-icon">
                  <FiClock />
                </span>
                <span className="stat-label">Total Time</span>
                <span className="stat-value">{recipe.totalTime}</span>
              </div>

              <div className="stat-box">
                <span className="stat-icon">
                  <FiUsers />
                </span>
                <span className="stat-label">Yields</span>
                <span className="stat-value">{recipe.yields}</span>
              </div>

              <div className="stat-box">
                <span className="stat-icon">
                  <FiZap />
                </span>
                <span className="stat-label">Difficulty</span>
                <span
                  className={`stat-value difficulty-${recipe.difficulty?.toLowerCase() || 'easy'}`}
                >
                  {recipe.difficulty}
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Title, Description, Tags, Tabs & Content */}
          <div className="recipe-content-column">
            <div className="recipe-header-info">
              <h1 className="recipe-title">{recipe.itemName}</h1>
              <p className="recipe-summary">{recipe.itemDescription}</p>

              {/* Tags List */}
              <div className="recipe-tags-list">
                {recipe.tags?.map((tag, idx) => (
                  <span key={idx} className="recipe-tag-pill">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Tab Navigation */}
            <div className="recipe-tabs-nav">
              <button
                type="button"
                className={`recipe-tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
                onClick={() => setActiveTab('overview')}
              >
                Overview
              </button>
              <button
                type="button"
                className={`recipe-tab-btn ${activeTab === 'ingredients' ? 'active' : ''}`}
                onClick={() => setActiveTab('ingredients')}
              >
                Ingredients
              </button>
              <button
                type="button"
                className={`recipe-tab-btn ${activeTab === 'instructions' ? 'active' : ''}`}
                onClick={() => setActiveTab('instructions')}
              >
                Instructions
              </button>
              <button
                type="button"
                className={`recipe-tab-btn ${activeTab === 'reviews' ? 'active' : ''}`}
                onClick={() => setActiveTab('reviews')}
              >
                Reviews ({recipe.reviews?.length ? recipe.reviews.length * 8 : 24})
              </button>
            </div>

            {/* Tab 1: Instructions (Matches User's Attached Screenshot) */}
            {activeTab === 'instructions' && (
              <div className="instructions-list">
                {recipe.instructions?.map((inst) => (
                  <div key={inst.step} className="instruction-step-card">
                    <div className="step-number-bubble">{inst.step}</div>
                    <div className="step-details">
                      <h3 className="step-title">{inst.title}</h3>
                      <p className="step-description">{inst.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Tab 2: Ingredients */}
            {activeTab === 'ingredients' && (
              <div className="ingredients-card">
                <p className="ingredients-intro">
                  Check off items as you prepare them in your kitchen:
                </p>
                <ul className="ingredients-list">
                  {recipe.ingredients?.map((ing, idx) => (
                    <li
                      key={idx}
                      className={`ingredient-item ${checkedIngredients[idx] ? 'checked' : ''}`}
                      onClick={() => toggleIngredient(idx)}
                    >
                      <input
                        type="checkbox"
                        checked={!!checkedIngredients[idx]}
                        onChange={() => toggleIngredient(idx)}
                        className="ingredient-checkbox"
                        onClick={(e) => e.stopPropagation()}
                      />
                      <span>{ing}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Tab 3: Overview */}
            {activeTab === 'overview' && (
              <div className="overview-card">
                <p className="overview-text">{recipe.overview}</p>
                <div className="nutrition-grid">
                  <div className="nutrition-pill">
                    <div className="nutrition-val">{recipe.nutrition?.calories || '520 kcal'}</div>
                    <div className="nutrition-key">Calories</div>
                  </div>
                  <div className="nutrition-pill">
                    <div className="nutrition-val">{recipe.nutrition?.protein || '32g'}</div>
                    <div className="nutrition-key">Protein</div>
                  </div>
                  <div className="nutrition-pill">
                    <div className="nutrition-val">{recipe.nutrition?.carbs || '45g'}</div>
                    <div className="nutrition-key">Carbs</div>
                  </div>
                  <div className="nutrition-pill">
                    <div className="nutrition-val">{recipe.nutrition?.fat || '22g'}</div>
                    <div className="nutrition-key">Fat</div>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 4: Reviews */}
            {activeTab === 'reviews' && (
              <div className="reviews-container">
                <div className="reviews-header-card">
                  <div className="overall-score">
                    <span className="score-number">4.9</span>
                    <div>
                      <div className="stars-row">★★★★★</div>
                      <span style={{ fontSize: '13px', color: '#6b7280' }}>
                        Based on 24 community ratings
                      </span>
                    </div>
                  </div>
                </div>
                <div className="reviews-list">
                  {recipe.reviews?.map((rev, idx) => (
                    <div key={idx} className="review-card">
                      <div className="review-author-row">
                        <span className="review-author">{rev.name}</span>
                        <span className="review-date">{rev.date}</span>
                      </div>
                      <div style={{ color: '#f59e0b', fontSize: '14px', marginBottom: '6px' }}>
                        {'★'.repeat(rev.rating)}
                      </div>
                      <p className="review-comment">{rev.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
