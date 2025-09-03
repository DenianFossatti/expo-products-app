import React from 'react'
import {View, ViewProps} from 'react-native'
import {cn} from '@/ui/utils/tw'

interface CardProps extends ViewProps {
  className?: string
  children: React.ReactNode
}

export const Card: React.FC<CardProps> = ({className, children, ...props}) => {
  return (
    <View className={cn('rounded-xl border border-border bg-card shadow-sm', className)} {...props}>
      {children}
    </View>
  )
}

export const CardHeader: React.FC<CardProps> = ({className, children, ...props}) => {
  return (
    <View className={cn('flex flex-col space-y-1.5 p-6', className)} {...props}>
      {children}
    </View>
  )
}

export const CardTitle: React.FC<CardProps> = ({className, children, ...props}) => {
  return (
    <View className={cn('font-semibold leading-none tracking-tight', className)} {...props}>
      {children}
    </View>
  )
}

export const CardDescription: React.FC<CardProps> = ({className, children, ...props}) => {
  return (
    <View className={cn('text-sm text-muted-foreground', className)} {...props}>
      {children}
    </View>
  )
}

export const CardContent: React.FC<CardProps> = ({className, children, ...props}) => {
  return (
    <View className={cn('p-6 pt-0', className)} {...props}>
      {children}
    </View>
  )
}

export const CardFooter: React.FC<CardProps> = ({className, children, ...props}) => {
  return (
    <View className={cn('flex items-center p-6 pt-0', className)} {...props}>
      {children}
    </View>
  )
}
