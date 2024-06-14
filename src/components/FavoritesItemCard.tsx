import {StyleSheet, Text, View, ImageProps} from 'react-native';
import React from 'react';
import ImageBackgroundInfo from './ImageBackgroundInfo';
import { LinearGradient } from 'expo-linear-gradient';
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from '../theme/theme';
import { Product } from 'store/store';
export interface FavoriteItemsCard {
  _id: string;
  productName: string;
  brand: string;
  descriptions: string;
  detailed_info: string;
  category: string;
  instockStatus: boolean;
  description: string;
  images: string[];
  quantity: number;
  price: number;
  BackHandler: any;
  favourite: boolean;
  ToggleFavourite: any;
}
const FavoritesItemCard: React.FC<FavoriteItemsCard> = ({
  _id,
  productName,
  brand,
  category,
  description,
  images,
  favourite,
  BackHandler,
  ToggleFavourite,
}) => {
  return (
    <View style={styles.CardContainer}>
      <ImageBackgroundInfo
        EnableBackHandler={false}
        imagelink_portrait={ images[0] }
          id={_id}
          favourite={favourite}
          name={productName}
          category={category}
          brandName={brand}
          BackHandler={BackHandler}
          ToggleFavourite={ToggleFavourite}
      />
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}
        style={styles.ContainerLinearGradient}>
        <Text style={styles.DescriptionTitle}>Description</Text>
        <Text style={styles.DescriptionText}>{description}</Text>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  CardContainer: {
    borderRadius: BORDERRADIUS.radius_25,
    overflow: 'hidden',
  },
  ContainerLinearGradient: {
    gap: SPACING.space_10,
    padding: SPACING.space_20,
  },
  DescriptionTitle: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_16,
    color: COLORS.secondaryLightGreyHex,
  },
  DescriptionText: {
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_14,
    color: COLORS.primaryWhiteHex,
  },
});

export default FavoritesItemCard;
