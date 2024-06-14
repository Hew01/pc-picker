import React, {useState} from 'react';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';
import {useStore} from '../store/store';
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from '../theme/theme';
import ImageBackgroundInfo from '../components/ImageBackgroundInfo';
import PaymentFooter from '../components/PaymentFooter';

const DetailsScreen = ({navigation, route}: any) => {
  const productList = useStore((state: any) => state.productList);
  const addToFavoriteList = useStore((state: any) => state.addToFavoriteList);
  const deleteFromFavoriteList = useStore((state: any) => state.deleteFromFavoriteList);
  const addToCart = useStore((state: any) => state.addToCart);

  const ItemOfIndex = productList.find((product: { _id: string; }) => product._id === route.params.id);

  const ToggleFavourite = () => {
    ItemOfIndex.favourite ? deleteFromFavoriteList(ItemOfIndex) : addToFavoriteList(ItemOfIndex);
  };

  const BackHandler = () => {
    navigation.pop();
  };

  const addToCarthandler = () => {
    addToCart(ItemOfIndex);
    navigation.navigate('Cart');
  };

  return (
    <View style={styles.ScreenContainer}>
      <StatusBar backgroundColor={COLORS.primaryBlackHex} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.ScrollViewFlex}>
        <ImageBackgroundInfo
          EnableBackHandler={true}
          imagelink_portrait={ ItemOfIndex.images[0] }
          id={ItemOfIndex._id}
          favourite={ItemOfIndex.favourite}
          name={ItemOfIndex.productName}
          category={ItemOfIndex.category}
          brandName={ItemOfIndex.brand}
          BackHandler={BackHandler}
          ToggleFavourite={ToggleFavourite}
        />

        <View style={styles.FooterInfoArea}>
          <Text style={styles.InfoTitle}>Description</Text>
          <Text style={styles.DescriptionText}>
            {ItemOfIndex.description}
          </Text>
          <Text style={styles.InfoTitle}>Specification</Text>
          <Text style={styles.DescriptionText}>
            {ItemOfIndex.detailed_info}
          </Text>
        </View>
        <PaymentFooter
          price={ItemOfIndex.price}
          buttonTitle="Add to Cart"
          buttonPressHandler={addToCarthandler}
        />
      </ScrollView>
    </View>
  );
};


const styles = StyleSheet.create({
  ScreenContainer: {
    flex: 1,
    backgroundColor: COLORS.primaryBlackHex,
  },
  ScrollViewFlex: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  FooterInfoArea: {
    padding: SPACING.space_20,
  },
  InfoTitle: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_16,
    color: COLORS.primaryWhiteHex,
    marginBottom: SPACING.space_10,
  },
  DescriptionText: {
    letterSpacing: 0.5,
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_14,
    color: COLORS.primaryWhiteHex,
    marginBottom: SPACING.space_30,
  },
  SizeOuterContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: SPACING.space_20,
  },
  SizeBox: {
    flex: 1,
    backgroundColor: COLORS.primaryDarkGreyHex,
    alignItems: 'center',
    justifyContent: 'center',
    height: SPACING.space_24 * 2,
    borderRadius: BORDERRADIUS.radius_10,
    borderWidth: 2,
  },
  SizeText: {
    fontFamily: FONTFAMILY.poppins_medium,
  },
});

export default DetailsScreen;
