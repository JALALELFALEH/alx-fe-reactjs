// src/components/AddRecipeForm.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AddRecipeForm() {
    const navigate = useNavigate();
    
    // Form state
    const [formData, setFormData] = useState({
        title: '',
        summary: '',
        ingredients: '',
        instructions: '',
        prepTime: '',
        cookTime: '',
        servings: '',
        difficulty: 'Easy',
        image: ''
    });
    
    // Validation errors state
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);
    
    // Handle input changes - CORRECTED
    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        
        setFormData(prev => ({
        ...prev,
        [name]: value
        }));
        
        // Clear error for this field when user starts typing
        if (errors[name]) {
        setErrors(prev => ({
            ...prev,
            [name]: ''
        }));
        }
    };
    
    // Validate form
    const validateForm = () => {
        const newErrors = {};
        
        // Required field validation
        if (!formData.title.trim()) newErrors.title = 'Recipe title is required';
        if (!formData.summary.trim()) newErrors.summary = 'Recipe summary is required';
        if (!formData.ingredients.trim()) newErrors.ingredients = 'Ingredients are required';
        if (!formData.instructions.trim()) newErrors.instructions = 'Instructions are required';
        if (!formData.prepTime.trim()) newErrors.prepTime = 'Prep time is required';
        if (!formData.cookTime.trim()) newErrors.cookTime = 'Cook time is required';
        if (!formData.servings.trim()) newErrors.servings = 'Servings are required';
        
        // Specific validations
        if (formData.title.trim().length < 3) newErrors.title = 'Title must be at least 3 characters';
        if (formData.summary.trim().length < 10) newErrors.summary = 'Summary must be at least 10 characters';
        
        // Ingredients validation - at least 2 items
        const ingredientLines = formData.ingredients
        .split('\n')
        .filter(line => line.trim() !== '');
        if (ingredientLines.length < 2) {
        newErrors.ingredients = 'Please enter at least 2 ingredients';
        }
        
        // Instructions validation - at least 3 steps
        const instructionLines = formData.instructions
        .split('\n')
        .filter(line => line.trim() !== '');
        if (instructionLines.length < 3) {
        newErrors.instructions = 'Please enter at least 3 preparation steps';
        }
        
        // Numeric validation
        if (formData.prepTime && isNaN(parseInt(formData.prepTime))) {
        newErrors.prepTime = 'Prep time must be a number';
        }
        if (formData.cookTime && isNaN(parseInt(formData.cookTime))) {
        newErrors.cookTime = 'Cook time must be a number';
        }
        if (formData.servings && (isNaN(parseInt(formData.servings)) || parseInt(formData.servings) < 1)) {
        newErrors.servings = 'Servings must be a positive number';
        }
        
        // Image URL validation (optional but if provided, validate)
        if (formData.image.trim() && !isValidUrl(formData.image)) {
        newErrors.image = 'Please enter a valid image URL';
        }
        
        return newErrors;
    };
    
    // URL validation helper
    const isValidUrl = (string) => {
        try {
        new URL(string);
        return true;
        } catch {
        return false;
        }
    };
    
    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Validate form
        const validationErrors = validateForm();
        setErrors(validationErrors);
        
        // Check if there are any errors
        if (Object.keys(validationErrors).length > 0) {
        // Scroll to first error
        const firstErrorField = Object.keys(validationErrors)[0];
        const errorElement = document.querySelector(`[name="${firstErrorField}"]`);
        if (errorElement) {
            errorElement.scrollIntoView({
            behavior: 'smooth',
            block: 'center'
            });
        }
        return;
        }
        
        setIsSubmitting(true);
        
        // Simulate API call
        try {
        // In a real app, you would send this to your backend
        const newRecipe = {
            id: Date.now(), // Generate unique ID
            title: formData.title,
            summary: formData.summary,
            ingredients: formData.ingredients.split('\n').filter(line => line.trim() !== ''),
            instructions: formData.instructions.split('\n').filter(line => line.trim() !== ''),
            prepTime: formData.prepTime,
            cookTime: formData.cookTime,
            totalTime: `${parseInt(formData.prepTime) + parseInt(formData.cookTime)} minutes`,
            servings: formData.servings,
            difficulty: formData.difficulty,
            image: formData.image || 'https://via.placeholder.com/150',
            rating: 4.0, // Default rating
            calories: 0, // Would calculate in real app
            tips: ['Add your own tips here!'],
            description: formData.summary
        };
        
        console.log('New recipe data:', newRecipe);
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Show success message
        setSubmitSuccess(true);
        
        // Reset form after 2 seconds and redirect
        setTimeout(() => {
            setFormData({
            title: '',
            summary: '',
            ingredients: '',
            instructions: '',
            prepTime: '',
            cookTime: '',
            servings: '',
            difficulty: 'Easy',
            image: ''
            });
            setErrors({});
            setIsSubmitting(false);
            
            // Redirect to home page
            navigate('/');
        }, 2000);
        
        } catch (error) {
        console.error('Error submitting recipe:', error);
        setErrors({ submit: 'Failed to submit recipe. Please try again.' });
        setIsSubmitting(false);
        }
    };
    
    // Handle cancel
    const handleCancel = () => {
        if (window.confirm('Are you sure you want to cancel? All unsaved changes will be lost.')) {
        navigate('/');
        }
    };
    
    // Handle clear form
    const handleClearForm = () => {
        setFormData({
        title: '',
        summary: '',
        ingredients: '',
        instructions: '',
        prepTime: '',
        cookTime: '',
        servings: '',
        difficulty: 'Easy',
        image: ''
        });
        setErrors({});
    };
    
    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-4">
        <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Share Your Recipe
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Fill out the form below to add your delicious recipe to our community collection
            </p>
            </div>
            
            {/* Success Message */}
            {submitSuccess && (
            <div className="bg-green-50 border border-green-200 rounded-xl p-6 mb-8 animate-pulse">
                <div className="flex items-center">
                <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-green-600 text-2xl">✓</span>
                    </div>
                </div>
                <div className="ml-4">
                    <h3 className="text-xl font-bold text-green-800">Recipe Submitted Successfully!</h3>
                    <p className="text-green-700">Your recipe is being added to our collection. Redirecting to home page...</p>
                </div>
                </div>
            </div>
            )}
            
            {/* Form Container */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            {/* Form Progress Steps */}
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 px-8 py-6">
                <div className="flex items-center justify-between">
                <div className="text-white">
                    <h2 className="text-2xl font-bold">New Recipe Form</h2>
                    <p className="text-blue-100 mt-1">All fields marked with * are required</p>
                </div>
                <div className="hidden md:flex items-center space-x-4">
                    <div className="text-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${Object.keys(errors).length === 0 ? 'bg-green-500' : 'bg-yellow-500'} text-white font-bold`}>
                        {Object.keys(errors).length}
                    </div>
                    <div className="text-white text-xs mt-1">Issues</div>
                    </div>
                    <div className="text-center">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center bg-white/20 text-white font-bold">
                        {Object.values(formData).filter(val => val.trim() !== '').length}
                    </div>
                    <div className="text-white text-xs mt-1">Filled</div>
                    </div>
                </div>
                </div>
            </div>
            
            {/* Form Content */}
            <div className="p-8">
                <form onSubmit={handleSubmit} noValidate>
                {/* Recipe Basic Information */}
                <div className="mb-12">
                    <h3 className="text-2xl font-bold text-gray-800 mb-6 pb-4 border-b border-gray-200">
                    <span className="text-blue-500">1.</span> Basic Information
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Recipe Title */}
                    <div className="md:col-span-2">
                        <label htmlFor="title" className="block text-gray-700 font-medium mb-2">
                        Recipe Title *
                        </label>
                        <input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-500 outline-none transition ${errors.title ? 'border-red-500' : 'border-gray-300'}`}
                        placeholder="e.g., Creamy Garlic Parmesan Pasta"
                        />
                        {errors.title && (
                        <p className="mt-2 text-red-600 text-sm flex items-center">
                            <span className="mr-1">⚠</span> {errors.title}
                        </p>
                        )}
                    </div>
                    
                    {/* Recipe Summary */}
                    <div className="md:col-span-2">
                        <label htmlFor="summary" className="block text-gray-700 font-medium mb-2">
                        Short Summary *
                        </label>
                        <textarea
                        id="summary"
                        name="summary"
                        value={formData.summary}
                        onChange={handleChange}
                        rows="3"
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-500 outline-none transition ${errors.summary ? 'border-red-500' : 'border-gray-300'}`}
                        placeholder="Briefly describe your recipe (what makes it special, cuisine type, etc.)"
                        />
                        {errors.summary && (
                        <p className="mt-2 text-red-600 text-sm flex items-center">
                            <span className="mr-1">⚠</span> {errors.summary}
                        </p>
                        )}
                    </div>
                    
                    {/* Prep Time */}
                    <div>
                        <label htmlFor="prepTime" className="block text-gray-700 font-medium mb-2">
                        Preparation Time (minutes) *
                        </label>
                        <input
                        type="text"
                        id="prepTime"
                        name="prepTime"
                        value={formData.prepTime}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-500 outline-none transition ${errors.prepTime ? 'border-red-500' : 'border-gray-300'}`}
                        placeholder="e.g., 15"
                        />
                        {errors.prepTime && (
                        <p className="mt-2 text-red-600 text-sm flex items-center">
                            <span className="mr-1">⚠</span> {errors.prepTime}
                        </p>
                        )}
                    </div>
                    
                    {/* Cook Time */}
                    <div>
                        <label htmlFor="cookTime" className="block text-gray-700 font-medium mb-2">
                        Cooking Time (minutes) *
                        </label>
                        <input
                        type="text"
                        id="cookTime"
                        name="cookTime"
                        value={formData.cookTime}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-500 outline-none transition ${errors.cookTime ? 'border-red-500' : 'border-gray-300'}`}
                        placeholder="e.g., 20"
                        />
                        {errors.cookTime && (
                        <p className="mt-2 text-red-600 text-sm flex items-center">
                            <span className="mr-1">⚠</span> {errors.cookTime}
                        </p>
                        )}
                    </div>
                    
                    {/* Servings */}
                    <div>
                        <label htmlFor="servings" className="block text-gray-700 font-medium mb-2">
                        Servings *
                        </label>
                        <input
                        type="text"
                        id="servings"
                        name="servings"
                        value={formData.servings}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-500 outline-none transition ${errors.servings ? 'border-red-500' : 'border-gray-300'}`}
                        placeholder="e.g., 4"
                        />
                        {errors.servings && (
                        <p className="mt-2 text-red-600 text-sm flex items-center">
                            <span className="mr-1">⚠</span> {errors.servings}
                        </p>
                        )}
                    </div>
                    
                    {/* Difficulty */}
                    <div>
                        <label htmlFor="difficulty" className="block text-gray-700 font-medium mb-2">
                        Difficulty Level
                        </label>
                        <select
                        id="difficulty"
                        name="difficulty"
                        value={formData.difficulty}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-500 outline-none transition"
                        >
                        <option value="Easy">Easy</option>
                        <option value="Medium">Medium</option>
                        <option value="Hard">Hard</option>
                        </select>
                    </div>
                    
                    {/* Image URL */}
                    <div className="md:col-span-2">
                        <label htmlFor="image" className="block text-gray-700 font-medium mb-2">
                        Recipe Image URL (optional)
                        </label>
                        <input
                        type="url"
                        id="image"
                        name="image"
                        value={formData.image}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-500 outline-none transition ${errors.image ? 'border-red-500' : 'border-gray-300'}`}
                        placeholder="https://example.com/recipe-image.jpg"
                        />
                        {errors.image ? (
                        <p className="mt-2 text-red-600 text-sm flex items-center">
                            <span className="mr-1">⚠</span> {errors.image}
                        </p>
                        ) : (
                        <p className="mt-2 text-gray-500 text-sm">
                            Leave empty to use a default placeholder image
                        </p>
                        )}
                        {/* Image Preview */}
                        {formData.image && !errors.image && (
                        <div className="mt-4">
                            <p className="text-sm text-gray-600 mb-2">Image Preview:</p>
                            <div className="w-32 h-32 border border-gray-300 rounded-lg overflow-hidden">
                            <img 
                                src={formData.image} 
                                alt="Preview" 
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                e.target.src = 'https://via.placeholder.com/150/cccccc/666666?text=Invalid+URL';
                                }}
                            />
                            </div>
                        </div>
                        )}
                    </div>
                    </div>
                </div>
                
                {/* Recipe Details */}
                <div className="mb-12">
                    <h3 className="text-2xl font-bold text-gray-800 mb-6 pb-4 border-b border-gray-200">
                    <span className="text-blue-500">2.</span> Recipe Details
                    </h3>
                    
                    {/* Ingredients */}
                    <div className="mb-8">
                    <label htmlFor="ingredients" className="block text-gray-700 font-medium mb-2">
                        Ingredients *
                        <span className="text-gray-500 text-sm font-normal ml-2">
                        (Enter each ingredient on a new line)
                        </span>
                    </label>
                    <textarea
                        id="ingredients"
                        name="ingredients"
                        value={formData.ingredients}
                        onChange={handleChange}
                        rows="6"
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-500 outline-none transition font-mono ${errors.ingredients ? 'border-red-500' : 'border-gray-300'}`}
                        placeholder="2 cups all-purpose flour
    1 tsp salt
    2 large eggs
    1 cup milk
    ..."
                    />
                    {errors.ingredients && (
                        <p className="mt-2 text-red-600 text-sm flex items-center">
                        <span className="mr-1">⚠</span> {errors.ingredients}
                        </p>
                    )}
                    <div className="mt-2 text-sm text-gray-500">
                        <div className="flex items-center">
                        <span className="mr-2">📝</span>
                        <span>
                            Ingredients entered: {formData.ingredients.split('\n').filter(line => line.trim() !== '').length}
                        </span>
                        </div>
                    </div>
                    </div>
                    
                    {/* Instructions */}
                    <div>
                    <label htmlFor="instructions" className="block text-gray-700 font-medium mb-2">
                        Preparation Instructions *
                        <span className="text-gray-500 text-sm font-normal ml-2">
                        (Enter each step on a new line)
                        </span>
                    </label>
                    <textarea
                        id="instructions"
                        name="instructions"
                        value={formData.instructions}
                        onChange={handleChange}
                        rows="8"
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-500 outline-none transition ${errors.instructions ? 'border-red-500' : 'border-gray-300'}`}
                        placeholder="Step 1: Preheat oven to 350°F (175°C)
    Step 2: Mix dry ingredients in a bowl
    Step 3: Add wet ingredients and mix until smooth
    ..."
                    />
                    {errors.instructions && (
                        <p className="mt-2 text-red-600 text-sm flex items-center">
                        <span className="mr-1">⚠</span> {errors.instructions}
                        </p>
                    )}
                    <div className="mt-2 text-sm text-gray-500">
                        <div className="flex items-center">
                        <span className="mr-2">👨‍🍳</span>
                        <span>
                            Steps entered: {formData.instructions.split('\n').filter(line => line.trim() !== '').length}
                        </span>
                        </div>
                    </div>
                    </div>
                </div>
                
                {/* Submit Error */}
                {errors.submit && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-red-700 flex items-center">
                        <span className="mr-2">❌</span> {errors.submit}
                    </p>
                    </div>
                )}
                
                {/* Form Actions */}
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-8 border-t border-gray-200">
                    <button
                    type="button"
                    onClick={handleCancel}
                    className="px-8 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition duration-200 w-full sm:w-auto"
                    disabled={isSubmitting}
                    >
                    Cancel
                    </button>
                    
                    <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
                    <button
                        type="button"
                        onClick={handleClearForm}
                        className="px-8 py-3 border border-blue-300 text-blue-600 font-medium rounded-lg hover:bg-blue-50 transition duration-200 w-full sm:w-auto"
                        disabled={isSubmitting}
                    >
                        Clear Form
                    </button>
                    
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`px-12 py-3 font-medium rounded-lg transition duration-200 flex items-center justify-center w-full sm:w-auto ${
                        isSubmitting 
                            ? 'bg-blue-400 cursor-not-allowed' 
                            : 'bg-blue-500 hover:bg-blue-600 transform hover:-translate-y-0.5'
                        } text-white shadow-lg hover:shadow-xl`}
                    >
                        {isSubmitting ? (
                        <>
                            <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-3"></div>
                            Submitting...
                        </>
                        ) : (
                        'Submit Recipe'
                        )}
                    </button>
                    </div>
                </div>
                </form>
            </div>
            
            {/* Form Tips */}
            <div className="bg-gray-50 border-t border-gray-200 p-8">
                <h3 className="text-lg font-bold text-gray-800 mb-4">💡 Tips for submitting great recipes:</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                    <h4 className="font-bold text-gray-700 mb-2">Be Specific</h4>
                    <p className="text-sm text-gray-600">Use exact measurements and clear instructions for best results.</p>
                </div>
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                    <h4 className="font-bold text-gray-700 mb-2">Check Formatting</h4>
                    <p className="text-sm text-gray-600">Each ingredient and step should be on its own line for proper display.</p>
                </div>
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                    <h4 className="font-bold text-gray-700 mb-2">Add Tips</h4>
                    <p className="text-sm text-gray-600">Consider adding cooking tips or serving suggestions in the instructions.</p>
                </div>
                </div>
            </div>
            </div>
            
            {/* Form Validation Summary (Mobile) */}
            <div className="mt-8 md:hidden">
            <div className="bg-white rounded-lg shadow p-6">
                <h3 className="font-bold text-gray-800 mb-4">Form Status</h3>
                <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">{Object.keys(errors).length}</div>
                    <div className="text-sm text-gray-600">Issues Found</div>
                </div>
                <div className="text-center p-3 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">
                    {Object.values(formData).filter(val => val.trim() !== '').length}/9
                    </div>
                    <div className="text-sm text-gray-600">Fields Filled</div>
                </div>
                </div>
            </div>
            </div>
        </div>
        </div>
    );
}

export default AddRecipeForm;