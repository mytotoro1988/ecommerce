"use client";
import CollectionForm from "@/components/collections/CollectionForm";
import Loader from "@/components/collections/custom ui/Loader";
import React, { useEffect, useState } from "react";

const CollectionDetail = ({ params }: { params: { collectionId: string } }) => {
  const [loading, setLoading] = useState(false);
  const [collectionDetails, setCollectionDetails] =
    useState<CollectionType | null>(null);
  useEffect(() => {
    getCollectionDetail();
  }, []);
  const getCollectionDetail = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/collections/${params.collectionId}`, {
        method: "GET",
      });
      const data = await res.json();
      setCollectionDetails(data);
      setLoading(false);
    } catch (err) {
      console.log("Collection_GET", err);
    }
  };

  return loading ? (
    <Loader />
  ) : (
    <CollectionForm initialData={collectionDetails} />
  );
};

export default CollectionDetail;
