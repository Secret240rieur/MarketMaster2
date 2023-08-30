import { NavigationContainer } from "@react-navigation/native";
import tw from "twrnc";
import { AnnoncesSauvegardées } from "./AnnoncesSauvegardées";
import { RecherchesSauvegardées } from "./RecherchesSauvegardées";

import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

const Tab = createMaterialTopTabNavigator();

export const Favoris = () => {
  return (
    <NavigationContainer independent>
      <Tab.Navigator
        initialRouteName="Annonces"
        screenOptions={() => ({
          tabBarActiveTintColor: "gray",
          tabBarInactiveTintColor: "gray",
          tabBarIndicatorStyle: { backgroundColor: "gray" },
        })}
        style={tw`pt-5 bg-white`}
      >
        <Tab.Screen
          name="Annonces sauvegardées"
          component={AnnoncesSauvegardées}
          options={{ title: "Annonces sauvegardées" }}
        />
        <Tab.Screen
          name="Recherches sauvegardes"
          component={RecherchesSauvegardées}
          options={{ title: "Recherches sauvegardées" }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};
