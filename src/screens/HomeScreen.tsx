import React, {useEffect, useRef, useState} from 'react';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ToastAndroid,
} from 'react-native';
import {Product, useStore} from '../store/store';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from '../theme/theme';
import HeaderBar from '../components/HeaderBar';
import CustomIcon from '../components/CustomIcon';
import {FlatList} from 'react-native';
import CoffeeCard from '../components/CoffeeCard';
import {Dimensions} from 'react-native';

const getCategoriesFromData = (data: any) => {
  let temp: any = {};
  for (let i = 0; i < data.length; i++) {
    if (temp[data[i].name] == undefined) {
      temp[data[i].name] = 1;
    } else {
      temp[data[i].name]++;
    }
  }
  let categories = Object.keys(temp);
  categories.unshift('All');
  return categories;
};

const getProductList = (category: string, data: any) => {
  if (category == 'All') {
    return data;
  } else {
    let productList = data.filter((item: any) => item.name == category);
    return productList;
  }
};

const HomeScreen = ({navigation}: any) => {
  const fetchProducts = useStore((state: any) => state.fetchProducts);
  const productList = useStore((state: any) => state.productList);
  const addToCart = useStore((state: any) => state.addToCart);
  const calculateCartPrice = useStore((state: any) => state.calculateCartPrice);

  const [categories, setCategories] = useState<string[]>([]);
  const [searchText, setSearchText] = useState('');
  const [categoryIndex, setCategoryIndex] = useState({ index: 0, category: 'All' });
  const [sortedProducts, setSortedProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetchProducts('products/all');
  }, []);

  useEffect(() => {
    const uniqueCategories : string[] = Array.from(new Set(productList.map((product: { category: any; }) => product.category)));
    uniqueCategories.unshift('All');
    setCategories(uniqueCategories);
    setSortedProducts(productList);
  }, [productList]);

  const filterProducts = (category: string) => {
    if (category === 'All') {
      setSortedProducts(productList);
    } else {
      const filteredProducts = productList.filter((product: { category: string; }) => product.category === category);
      setSortedProducts(filteredProducts);
    }
  };

  const ListRef: any = useRef<FlatList>();

  const tabBarHeight = useBottomTabBarHeight();

  const searchProduct = (search: string) => {
    if (search != '') {
      ListRef?.current?.scrollToOffset({
        animated: true,
        offset: 0,
      });
      setCategoryIndex({index: 0, category: categories[0]});
      setSortedProducts([
        ...productList.filter((item: any) =>
          item.name.toLowerCase().includes(search.toLowerCase()),
        ),
      ]);
    }
  };

  const resetSearchProduct = () => {
    ListRef?.current?.scrollToOffset({
      animated: true,
      offset: 0,
    });
    setCategoryIndex({index: 0, category: categories[0]});
    setSortedProducts([...productList]);
    setSearchText('');
  };

  const ProductCardAddToCart = ({
    id,
    index,
    name,
    brand,
    images,
    category,
    price,
  }: any) => {
    addToCart({
      id,
      index,
      name,
      brand,
      images,
      category,
      price,
    });
    calculateCartPrice();
    ToastAndroid.showWithGravity(
      `${name} is Added to Cart`,
      ToastAndroid.SHORT,
      ToastAndroid.CENTER,
    );
  };

  return (
    <View style={styles.ScreenContainer}>
      <StatusBar backgroundColor={COLORS.primaryBlackHex} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.ScrollViewFlex}>
        {/* App Header */}
        <HeaderBar />

        <Text style={styles.ScreenTitle}>
          Find the best{'\n'}coffee for you
        </Text>

        {/* Search Input */}

        <View style={styles.InputContainerComponent}>
          <TouchableOpacity
            onPress={() => {
              searchProduct(searchText);
            }}>
            <CustomIcon
              style={styles.InputIcon}
              name="search"
              size={FONTSIZE.size_18}
              color={
                searchText.length > 0
                  ? COLORS.primaryOrangeHex
                  : COLORS.primaryLightGreyHex
              }
            />
          </TouchableOpacity>
          <TextInput
            placeholder="Find Your Product..."
            value={searchText}
            onChangeText={text => {
              setSearchText(text);
              searchProduct(text);
            }}
            placeholderTextColor={COLORS.primaryLightGreyHex}
            style={styles.TextInputContainer}
          />
          {searchText.length > 0 ? (
            <TouchableOpacity
              onPress={() => {
                resetSearchProduct();
              }}>
              <CustomIcon
                style={styles.InputIcon}
                name="close"
                size={FONTSIZE.size_16}
                color={COLORS.primaryLightGreyHex}
              />
            </TouchableOpacity>
          ) : (
            <></>
          )}
        </View>

        {/* Category Scroller */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.CategoryScrollViewStyle}>
        {categories.map((data, index) => (
          <TouchableOpacity
            key={index.toString()}
            style={styles.CategoryScrollViewItem}
            onPress={() => {
              ListRef?.current?.scrollToOffset({
                animated: true,
                offset: 0,
              });
              setCategoryIndex({index: index, category: categories[index]});
              filterProducts(categories[index]);
            }}>
            <Text
              style={[
                styles.CategoryText,
                categoryIndex.index == index
                  ? {color: COLORS.primaryOrangeHex}
                  : {},
              ]}>
              {data}
            </Text>
            {categoryIndex.index == index ? (
              <View style={styles.ActiveCategory} />
            ) : null}
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Product Flatlist */}
      <FlatList
        ref={ListRef}
        horizontal
        ListEmptyComponent={
          <View style={styles.EmptyListContainer}>
            <Text style={styles.CategoryText}>No Products Available</Text>
          </View>
        }
        showsHorizontalScrollIndicator={false}
        data={sortedProducts}
        contentContainerStyle={styles.FlatListContainer}
        keyExtractor={item => item._id}
        renderItem={({item}) => {
          return (
            <TouchableOpacity
              onPress={() => {
                navigation.push('Details', {
                  id: item._id,
                });
              }}>
              <CoffeeCard
                _id={item._id}
                productName={item.productName}
                brand={item.brand}
                descriptions={item.descriptions}
                detailed_info={item.detailed_info}
                category={item.category}
                instockStatus={item.instockStatus}
                description={item.description}
                images={item.images}
                quantity={item.quantity}
                price={item.price}
                favourite={item.favourite}
                buttonPressHandler={ProductCardAddToCart}
              />
            </TouchableOpacity>
          );
        }}
      />
      </ScrollView>
      <TouchableOpacity style={styles.messageButton} onPress={() => { /* Handle button press */ }}>
        <Text style={styles.buttonText}>Message</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  messageButton: {
    position: 'absolute', // Position the button absolutely
    right: 20, // 10 pixels from the right edge of the screen
    bottom: 100, // 10 pixels from the bottom edge of the screen
    backgroundColor: COLORS.primaryOrangeHex, // Button color
    padding: 10, // Padding inside the button
    borderRadius: 20, // Rounded corners
  },
  buttonText: {
    color: '#FFFFFF', // Text color
  },
  ScreenContainer: {
    flex: 1,
    backgroundColor: COLORS.primaryBlackHex,
    paddingBottom: 80
  },
  ScrollViewFlex: {
    flexGrow: 1,
  },
  ScreenTitle: {
    fontSize: FONTSIZE.size_28,
    fontFamily: FONTFAMILY.poppins_semibold,
    color: COLORS.primaryWhiteHex,
    paddingLeft: SPACING.space_30,
  },
  InputContainerComponent: {
    flexDirection: 'row',
    margin: SPACING.space_30,
    borderRadius: BORDERRADIUS.radius_20,
    backgroundColor: COLORS.primaryDarkGreyHex,
    alignItems: 'center',
  },
  InputIcon: {
    marginHorizontal: SPACING.space_20,
  },
  TextInputContainer: {
    flex: 1,
    height: SPACING.space_20 * 3,
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_14,
    color: COLORS.primaryWhiteHex,
  },
  CategoryScrollViewStyle: {
    gap: SPACING.space_20,
    paddingHorizontal: SPACING.space_20,
    marginBottom: SPACING.space_20,
  },
  CategoryScrollViewContainer: {
    paddingHorizontal: SPACING.space_15,
  },
  CategoryScrollViewItem: {
    alignItems: 'center',
  },
  CategoryText: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_16,
    color: COLORS.primaryLightGreyHex,
    marginBottom: SPACING.space_4,
  },
  ActiveCategory: {
    height: SPACING.space_10,
    width: SPACING.space_10,
    borderRadius: BORDERRADIUS.radius_10,
    backgroundColor: COLORS.primaryOrangeHex,
  },
  FlatListContainer: {
    gap: SPACING.space_20,
    paddingVertical: SPACING.space_20,
    paddingHorizontal: SPACING.space_30,
  },
  EmptyListContainer: {
    width: Dimensions.get('window').width - SPACING.space_30 * 2,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.space_36 * 3.6,
  },
  CoffeeBeansTitle: {
    fontSize: FONTSIZE.size_18,
    marginLeft: SPACING.space_30,
    marginTop: SPACING.space_20,
    fontFamily: FONTFAMILY.poppins_medium,
    color: COLORS.secondaryLightGreyHex,
  },
});

export default HomeScreen;
