# Copa de Filmes API

## Criar política para o CloudFormation (se não existir):

<https://console.aws.amazon.com/iam/home?region=us-east-1#/roles>

* Tipo da função: CloudFormation
* Permissões:
   * AWSLambdaFullAccess
   * AmazonEC2RoleforSSM
   * IAMFullAccess
   * AmazonS3FullAccess
   * AmazonDynamoDBFullAccess
   * CloudFrontFullAccess
   * AmazonDocDBFullAccess
   * AWSGlueServiceRole
   * AmazonKinesisFullAccess
   * AmazonAPIGatewayAdministrator

Assim que criar, adicionar a seguinte inline-permission:

```
{
	"Version": "2012-10-17",
	"Statement": [{
		"Sid": "VisualEditor0",
		"Effect": "Allow",
		"Action": [
			"ssm:PutParameter",
			"ssm:DeleteParameter",
			"ssm:DescribeParameters",
			"ssm:RemoveTagsFromResource",
			"ssm:AddTagsToResource",
			"ssm:GetParameters",
			"ssm:GetParameter",
			"ssm:DeleteParameters"
		],
		"Resource": "*"
	}]
}
```

Adicionar o ARN da função criada no parâmetro `cfnRole`, dentro do arquivo `serverless.yml`.

## Deploy em stage DEV:

`npm install && sls deploy -v --stage dev`

## Deploy em stage PRD:

`npm install && sls deploy -v --stage prd`

## Rodar ambiente local:

`npm install && npm start`
