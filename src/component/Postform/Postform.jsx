import React, { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import Button from "../Button.jsx";
import Select from "../Select.jsx";
import RTE from "../RTE.jsx";
import Input from "../Input.jsx";
import appwriteService from "../../appwrite/config.js";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export function Postform({ post }) {
    const { register, handleSubmit, watch, setValue, control, getValues, reset } = useForm();

    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);

    useEffect(() => {
        // Reset form values when `post` changes
        reset({
            title: post?.title || "",
            slug: post?.$id || "",
            CONTENT:post?.CONTENT || "gg",
            status: post?.status || "active",
            IMAGE: post?.IMAGE || "https://default-image-url.com",
        });
    }, [post, reset]);

    const submit = async (data) => {
        try {
            let imageUrl = post?.IMAGE || null;

            if (data.IMAGE?.[0]) {
                const file = await appwriteService.uploadfile(data.IMAGE[0]);
                if (file) {
                    imageUrl = appwriteService.getFilePreview(file.$id);
                    if (post?.IMAGE) {
                        await appwriteService.deletefile(post.IMAGE);
                    }
                }
            }

            const payload = {
                ...data,
                IMAGE: imageUrl,
            };

            if (post) {
                const updatedPost = await appwriteService.updatepost(post.$id, payload);
                if (updatedPost) navigate(`/post/${updatedPost.$id}`);
            } else {
                const newPost = await appwriteService.createPost({
                    ...payload,
                    userId: userData.$id,
                });
                if (newPost) navigate(`/post/${newPost.$id}`);
            }
        } catch (error) {
            console.error("Error submitting post:", error);
        }
    };

    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string")
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s/g, "-");

        return "";
    }, []);

    useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title") {
                setValue("slug", slugTransform(value.title), { shouldValidate: true });
            }
        });

        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue]);

    return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
            <div className="w-2/3 px-2">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: true })}
                />
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                <RTE label="CONTENT :" name="CONTENT" control={control} defaultValue={getValues("CONTENT")} />
            </div>
            <div className="w-1/3 px-2">
                <Input
                    label="IMAGE :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("IMAGE", { required: !post })}
                />
                {post && (
                    <div className="w-full mb-4">
                        <img
                            src={appwriteService.getFilePreview(post.IMAGE)}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: true })}
                />
                <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
                    {post ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
    );
}