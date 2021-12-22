public with sharing class ProductDataService {

     @AuraEnabled(cacheable = true)
    public static string getAllProducts(String term){
		Pricebook2 pb = [SELECT Id FROM Pricebook2 WHERE IsStandard = true];
        String termLike = '%' + term + '%';
		List<Product2> products = [SELECT Id, Name, (SELECT PricebookEntry.UnitPrice FROM PricebookEntries WHERE Pricebook2Id = :pb.Id) FROM Product2 WHERE Name LIKE :termLike];
        return JSON.serialize(products);
    }

    @AuraEnabled
    public static Product2 getProduct(Id productId){
        Pricebook2 pb = [SELECT Id FROM Pricebook2 WHERE IsStandard = true];
        Product2 prod = [SELECT Id, Name, (SELECT PricebookEntry.UnitPrice FROM PricebookEntries WHERE Pricebook2Id = :pb.Id) FROM Product2 WHERE Id = :productId];
        return prod;
    }


}