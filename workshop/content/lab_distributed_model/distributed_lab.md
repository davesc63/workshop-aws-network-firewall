+++
title = "East-West Inspection"
weight = 2
+++

In this lab we are going to deployed the East-West Inspection Model.
![distributed-model](/images/e-w-model1.png)

1. Create the **AWS VPC**

      - **CDK** code has been written to make it easy to deploy your VPC
      - This will deploy a **TGW** and a **Firewall** VPC
<br>

            FirewallVpc = ec2.Vpc(self, "FirewallVpc", cidr="10.8.0.0/22", max_azs=2,
                              subnet_configuration=[
                                ec2.SubnetConfiguration(name="TGW",      cidr_mask=28, subnet_type=ec2.SubnetType.ISOLATED),
                                ec2.SubnetConfiguration(name="Firewall", cidr_mask=24, subnet_type=ec2.SubnetType.ISOLATED)
                             ])
<br>

2. Create the **AWS Transit Gateway**

    - **CDK** code has been written to make it easy to deploy your TGW
    - A Transit Gateway is created and attached to the VPC
<br>

          from aws_cdk import core
          import aws_cdk.aws_ec2 as ec2

          class Network(core.Stack):

              def __init__(self, scope: core.Construct, id: str, cidr_range: str, tgw_asn: int, **kwargs) -> None:
                  super().__init__(scope, id, **kwargs)

                  # VPC Creation
                  self.vpc = ec2.Vpc(self,
                      f"{kwargs['env']['region']}-vpc",
                      max_azs=1,
                      cidr=cidr_range,
                      # configuration will create 1 subnet in a single AZ.
                      subnet_configuration=[ec2.SubnetConfiguration(
                              subnet_type=ec2.SubnetType.ISOLATED,
                              name="Isolated",
                              cidr_mask=25
                              )
                      ]
                  )

                  # Transit Gateway creation
                  self.tgw = ec2.CfnTransitGateway(
                      self,
                      id=f"TGW-{kwargs['env']['region']}",
                      amazon_side_asn=tgw_asn,
                      auto_accept_shared_attachments="enable",
                      default_route_table_association="enable",
                      default_route_table_propagation="enable",
                      tags=[core.CfnTag(key='Name', value=f"tgw-{kwargs['env']['region']}")]
                  )

                  # Transit Gateway attachment to the VPC
                  self.tgw_attachment = ec2.CfnTransitGatewayAttachment(
                      self,
                      id=f"tgw-vpc-{kwargs['env']['region']}",
                      transit_gateway_id=self.tgw.ref,
                      vpc_id=self.vpc.vpc_id,
                      subnet_ids=[subnet.subnet_id for subnet in self.vpc.isolated_subnets],
                      tags=[core.CfnTag(key='Name', value=f"tgw-{self.vpc.vpc_id}-attachment")]
                  )

                  # VPC Endpoint creation for SSM (3 Endpoints needed)
                  ec2.InterfaceVpcEndpoint(
                      self,
                      "VPCe - SSM",
                      service=ec2.InterfaceVpcEndpointService(
                          core.Fn.sub("com.amazonaws.${AWS::Region}.ssm")
                      ),
                      private_dns_enabled=True,
                      vpc=self.vpc,
                  )

                  ec2.InterfaceVpcEndpoint(
                      self,
                      "VPCe - EC2 Messages",
                      service=ec2.InterfaceVpcEndpointService(
                          core.Fn.sub("com.amazonaws.${AWS::Region}.ec2messages")
                      ),
                      private_dns_enabled=True,
                      vpc=self.vpc,
                  )

                  ec2.InterfaceVpcEndpoint(
                      self,
                      "VPCe - SSM Messages",
                      service=ec2.InterfaceVpcEndpointService(
                          core.Fn.sub("com.amazonaws.${AWS::Region}.ssmmessages")
                      ),
                      private_dns_enabled=True,
                      vpc=self.vpc,
                  )

3. Create the Transit Gateway **Route Table**
- **Python** script is provided as this step is not integrated with CDK (Nov 2020)

      import boto3

      client = boto3.client('ec2', region_name='us-east-1')

      query = client.describe_transit_gateway_attachments(
          Filters=[
              {
                  'Name': 'resource-type',
                  'Values': [
                      'vpc',
                  ]
              },
              {
                  'Name': 'state',
                  'Values': [
                      'available',
                  ]
              }
          ]
      )

      tgw_rt_id_us_east_1=(query['TransitGatewayAttachments'][0]['Association']['TransitGatewayRouteTableId'])
      tgw_attachment_id=(query['TransitGatewayAttachments'][0]['TransitGatewayAttachmentId'])

      response = client.create_transit_gateway_route(
          DestinationCidrBlock='172.16.1.0/24',
          TransitGatewayRouteTableId=(tgw_rt_id_us_east_1),
          TransitGatewayAttachmentId=(tgw_attachment_id)
      )



