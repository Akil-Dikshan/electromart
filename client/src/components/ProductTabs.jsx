import React, { useState } from 'react';


const ProductTabs = ({ product }) => {
    const [activeTab, setActiveTab] = useState('Description');

    return (
        <div className="flex flex-col gap-8 w-full">
            {/* Tabs */}
            <div className="flex gap-8 border-b border-gray-200">
                {['Description', 'Review (3)'].map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`pb-3 text-[18px] font-semibold transition-colors relative cursor-pointer
                            ${activeTab === tab ? 'text-[#2B3445]' : 'text-gray-400 hover:text-gray-600'}
                        `}
                    >
                        {tab}
                        {activeTab === tab && (
                            <div className="absolute bottom-0 left-0 w-full h-[2px] bg-[#2B3445] rounded-t-sm" />
                        )}
                    </button>
                ))}
            </div>

            {/* Tab Content */}
            {activeTab === 'Description' && (
                <div className="flex flex-col gap-10">
                    <div className="flex flex-col gap-3 text-[14px] text-gray-600">
                        <h3 className="text-[20px] font-bold text-[#2B3445] mb-2">Description:</h3>
                        <p className="mb-4">{product?.description || 'No description available.'}</p>

                        {product?.specifications && Object.keys(product.specifications).length > 0 && (
                            <>
                                <h3 className="text-[20px] font-bold text-[#2B3445] mt-4 mb-2">Specification:</h3>
                                {Object.entries(product.specifications).map(([key, value]) => (
                                    <p key={key}>{key}: <span className="text-gray-800 font-medium">{value}</span></p>
                                ))}
                            </>
                        )}
                    </div>


                </div>
            )}
        </div>
    );
};

export default ProductTabs;
