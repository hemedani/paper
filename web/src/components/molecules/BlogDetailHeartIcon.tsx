"use client";

import { toggleFavBlog } from "@/app/actions/blog/toggleFavBlog";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { HeartIcon } from "./HeartIcon";

export const BlogDetailHeartIcon = ({ likes, isLogedIn, isLiked, _id, dontShowText }: { likes?: number, isLogedIn: boolean, isLiked: boolean, _id: string, dontShowText?: boolean }) => {

	const [isFavorite, setIsFavorite] = useState(isLiked);

	const router = useRouter();
	const handleFavoriteClick = async () => {
		if (!isLogedIn) {
			router.push("/login");
			return;
		}
		const isAddedFavorite = await toggleFavBlog({ set: { blogId: _id }, get: {} });
		if (isAddedFavorite.success) {
			setIsFavorite(!isFavorite);
		}
	};

	return (
		<div className="flex items-center gap-1">
			<HeartIcon filled={isFavorite} onClick={handleFavoriteClick} />
			{dontShowText !== true && (
				<span>{likes || 0} لایک</span>
			)}
		</div>

	)

}

