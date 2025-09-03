import "./global.css";
import React from "react";
import { Button, Text, View } from "react-native";
import type { SharedValue } from "react-native-reanimated";
import Animated, {
	scrollTo,
	useAnimatedRef,
	useDerivedValue,
	useSharedValue,
} from "react-native-reanimated";

const ITEM_COUNT = 10;
const ITEM_SIZE = 100;
const ITEM_MARGIN = 10;

export default function App() {
	const ref = useAnimatedRef<Animated.ScrollView>();
	const scroll = useSharedValue(0);

	useDerivedValue(() => {
		scrollTo(ref, scroll.get() * (ITEM_SIZE + 2 * ITEM_MARGIN), 0, true);
	});

	const items = Array.from(Array(ITEM_COUNT).keys());

	return (
		<View className="flex-1 items-center">
			<Incrementor increment={-1} scroll={scroll} />
			<View className="w-full h-[250px] items-center">
				<Animated.ScrollView ref={ref}>
					{items.map((_, i) => (
						<View
							key={i}
							className="bg-[red] items-center justify-center"
							style={{
								width: ITEM_SIZE,
								height: ITEM_SIZE,
								margin: ITEM_MARGIN,
							}}
						>
							<Text style={{ textAlign: "center" }}>{i}</Text>
						</View>
					))}
				</Animated.ScrollView>
			</View>
			<Incrementor increment={1} scroll={scroll} />
		</View>
	);
}

const Incrementor = ({
	increment,
	scroll,
}: {
	increment: number;
	scroll: SharedValue<number>;
}) => (
	<View className="flex-1 items-center justify-center">
		<Button
			onPress={() => {
				scroll.set(
					scroll.get() + increment > 0
						? scroll.get() + increment
						: ITEM_COUNT - 1 + increment,
				);

				if (scroll.get() >= ITEM_COUNT - 2) {
					scroll.set(0);
				}
			}}
			title={`Scroll ${Math.abs(increment)} ${increment > 0 ? "down" : "up"}`}
		/>
	</View>
);
